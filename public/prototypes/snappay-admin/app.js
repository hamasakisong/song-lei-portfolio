/* THROWAWAY PROTOTYPE: A table/list layout with navigation, filters and detail dialogs.
 * Synthetic data only. All mutations stay in memory; no payment or backend requests. */
'use strict';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = cents => new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(cents/100)+' CAD';
const stamp = () => new Date().toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false});
const pages = {orders:'订单',users:'用户与银行卡',merchants:'商户管理',products:'产品管理',cards:'储值卡',refunds:'退款',exceptions:'异常处理',ledger:'账务',recon:'对账',audit:'操作审计',roles:'角色权限',operators:'操作员授权'};
const navigationGroups=[
 {id:'base',label:'公共基础',icon:'◷',children:['roles','operators','audit']},
 {id:'user',label:'用户管理',icon:'♙',children:['users']},
 {id:'merchant',label:'商户',icon:'◇',children:['merchants','products']},
 {id:'card',label:'卡片管理',icon:'▣',children:['cards']},
 {id:'trade',label:'交易管理',icon:'▤',children:['orders','refunds','exceptions']},
 {id:'ledger',label:'账务会计管理',icon:'≡',children:['ledger']},
 {id:'recon',label:'清结算管理',icon:'⇄',children:['recon']}
];
const expandedMenus=new Set(['merchant','trade']);
const pageGroup=()=>navigationGroups.find(g=>g.children.includes(page));
function navigation(){return navigationGroups.map(g=>`<details class="nav-group" data-menu="${g.id}" ${expandedMenus.has(g.id)||g.children.includes(page)?'open':''}><summary><span class="nav-icon">${g.icon}</span>${g.label}<span class="nav-chevron">⌄</span></summary><div class="nav-children">${g.children.map(id=>`<button data-action="nav" data-id="${id}" class="${page===id?'active':''}" ${page===id?'aria-current="page"':''}>${pages[id]}${id==='exceptions'?`<span class="badge-count">${visibleOrders().filter(o=>o.payment==='未知'||o.fulfillment==='待恢复').length}</span>`:''}</button>`).join('')}</div></details>`).join('');}

if(location.search){const cleanUrl=new URL(location.href);cleanUrl.searchParams.delete('variant');history.replaceState({},'',cleanUrl);}
let page='orders', selected=null, search='', status='all', task='all', scope='all', canMutate=true, demoMode='normal';
let cards,orders,refunds,audits,ledger,differences,sequence;
function reset(){
 cards=[{id:'CARD-01',user:'U-1001',name:'林女士',phone:'+1 *** *** 0191',merchant:'枫叶咖啡',product:'咖啡储值卡',balance:20000,reserved:0,consumed:true,state:'正常'},
 {id:'CARD-02',user:'U-1002',name:'陈先生',phone:'+1 *** *** 0282',merchant:'枫叶咖啡',product:'咖啡储值卡',balance:15000,reserved:0,consumed:false,state:'正常'},
 {id:'CARD-03',user:'U-1003',name:'王女士',phone:'+1 *** *** 0363',merchant:'北岸生活',product:'生活储值卡',balance:2000,reserved:0,consumed:false,state:'正常'},
 {id:'CARD-04',user:'U-1004',name:'周先生',phone:'+1 *** *** 0474',merchant:'北岸生活',product:'生活储值卡',balance:3000,reserved:0,consumed:false,state:'正常'}];
 orders=[{id:'SP-241001',type:'消费',card:'CARD-01',amount:10000,payment:'成功',fulfillment:'已扣款',refunded:0,time:'2026-10-24 10:32',bank:'—'},
 {id:'SP-241002',type:'购卡',card:'CARD-02',amount:10000,payment:'成功',fulfillment:'已到账',refunded:0,time:'2026-10-24 09:40',bank:'Visa · 4242'},
 {id:'SP-241003',type:'充值',card:'CARD-02',amount:5000,payment:'成功',fulfillment:'已到账',refunded:0,time:'2026-10-24 10:05',bank:'Mastercard · 5556'},
 {id:'SP-241004',type:'充值',card:'CARD-03',amount:8000,payment:'成功',fulfillment:'待恢复',refunded:0,time:'2026-10-24 10:18',bank:'Visa · 4242'},
 {id:'SP-241005',type:'充值',card:'CARD-04',amount:6000,payment:'未知',fulfillment:'待收款确认',refunded:0,time:'2026-10-23 08:00',bank:'Visa · 4242'},
 {id:'SP-241006',type:'消费',card:'CARD-01',amount:4000,payment:'失败',fulfillment:'未扣款',refunded:0,time:'2026-10-24 11:12',bank:'—'}];
 refunds=[];audits=[];sequence=1;
 ledger=[{order:'SP-241002',card:'CARD-02',type:'购卡入账',amount:10000},{order:'SP-241003',card:'CARD-02',type:'充值入账',amount:5000},{order:'SP-241001',card:'CARD-01',type:'消费扣款',amount:-10000}];
 differences=[{id:'DIFF-01',order:'SP-241003',merchant:'枫叶咖啡',local:5000,channel:4500,type:'金额不一致',state:'待核实',reason:''},{id:'DIFF-02',order:'SP-241004',merchant:'北岸生活',local:8000,channel:8000,type:'收款成功、履约待恢复',state:'待核实',reason:''}];
 resetManagement();
 resetAccess();
}
reset();
const cardFor=o=>cards.find(c=>c.id===o.card);
const allowed=o=>scope==='all'||cardFor(o)?.merchantId===scope;
const visibleOrders=()=>orders.filter(allowed);
const pill=(value)=>`<span class="pill ${['成功','已到账','已扣款','正常','已解决','已完成'].includes(value)?'ok':['失败','关闭','冻结','停用'].includes(value)?'bad':['未知','待恢复','待核实','处理中','已预留'].includes(value)?'warn':'info'}"><span class="dot"></span>${esc(value)}</span>`;
function audit(action,target,reason,result,meta={}){const order=orders.find(o=>o.id===target),difference=differences.find(d=>d.id===target);audits.unshift({time:stamp(),action,target,reason,result,merchantId:meta.merchantId||(order?cardFor(order).merchantId:difference?.merchantId)||'平台',operator:permissionMode==='config'?'演示配置维护员':permissionMode==='funds'?'演示资金操作员':'演示综合操作员',before:meta.before,after:meta.after});}
function notify(message){$('#toast').textContent=message;$('#toast').style.display='block';clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('#toast').style.display='none',3500);}
function refundBlock(o){
 const c=cardFor(o);
 if(!canMutate)return '当前为只读权限，不能执行退款。';
 if(!allowed(o))return '不在授权数据范围内。';
 if(o.payment!=='成功'||!['已到账','已扣款'].includes(o.fulfillment))return '原交易尚未完成，不能按已到账订单退款。';
 if(o.refunded>=o.amount)return '原交易已全额退款。';
 if(refunds.some(r=>r.order===o.id&&r.state==='处理中'))return '该订单有退款处理中，请先查询原退款结果。';
 if(o.type!=='消费'){
  if(c.consumed)return '该卡曾发生消费，不符合已到账购卡／充值原路退款条件。';
  if(c.balance-c.reserved<o.amount)return '可用余额不足以预留对应订单的全额退款。';
  if(o.type==='购卡'){
   const recharge=orders.filter(x=>x.card===c.id&&x.type==='充值'&&x.refunded<x.amount);
   if(recharge.length)return '请先退完充值订单 '+recharge.map(x=>x.id).join('、')+'，再退购卡订单。';
   if(c.reserved||c.balance!==o.amount)return '购卡退款需无在途资金占用，且剩余余额等于购卡金额。';
  }
 }
 return '';
}
function currentRows(){return visibleOrders().filter(o=>{
 const c=cardFor(o);const query=(o.id+' '+o.type+' '+c.user+' '+c.name+' '+c.merchant).toLowerCase();
 return query.includes(search.toLowerCase())&&(status==='all'||o.payment===status)&&(task!=='pending'||o.fulfillment==='待恢复'||o.payment==='未知')&&(task!=='refundable'||(!refundBlock(o)||o.type==='购卡'));
});}
function details(o,modal=false){
 const c=cardFor(o),block=refundBlock(o);
 return `<div class="details-title"><div><div class="eyebrow">交易详情 · ${esc(o.type)}</div><h2>${esc(o.id)}</h2></div>${pill(o.refunded===o.amount?'已全额退款':o.payment)}</div>
 <div class="detail-grid"><div><label>交易金额</label><strong class="amount">${money(o.amount)}</strong></div><div><label>所属商户</label>${esc(c.merchant)}</div><div><label>用户</label>${esc(c.name)} · ${esc(c.user)}</div><div><label>资金来源</label>${esc(o.bank)}</div><div><label>储值卡</label>${esc(c.id)} · ${pill(c.state)}</div><div><label>累计已退</label>${money(o.refunded)}</div></div>
 <div class="steps"><div class="step ${o.payment==='成功'?'ok':'warn'}">${o.type==='消费'?'消费结果':'银行卡收款'}<br><strong>${esc(o.payment)}</strong></div><div class="step ${['已到账','已扣款'].includes(o.fulfillment)?'ok':'warn'}">${o.type==='消费'?'余额扣减':'卡业务履约'}<br><strong>${esc(o.fulfillment)}</strong></div><div class="step ${o.refunded?'ok':''}">退款进度<br><strong>${o.refunded===o.amount?'全额已退':o.refunded?'部分已退':'暂无退款'}</strong></div></div>
 <div class="balance-grid"><div><span class="muted">卡总余额</span><strong>${money(c.balance)}</strong></div><div><span class="muted">退款预留</span><strong>${money(c.reserved)}</strong></div><div><span class="muted">可用余额</span><strong>${money(c.balance-c.reserved)}</strong></div></div>
 <div class="actions"><button class="primary" data-action="refund" data-id="${o.id}">${o.type==='消费'?'消费退款':'原路退款'}</button>${o.fulfillment==='待恢复'?`<button data-action="recover" data-id="${o.id}" ${!canMutate?'disabled':''}>恢复充值</button>`:''}${o.payment==='未知'?`<button data-action="query" data-id="${o.id}">查询支付结果</button>`:''}<button data-action="related-ledger" data-id="${o.id}">关联账务</button></div>
 ${block?`<div class="page-note danger-text">退款条件：${esc(block)}</div>`:`<div class="page-note">${o.type==='消费'?'支持全额／部分退款，款项恢复原卡余额。':'该卡从未消费；仅允许指定订单全额原路退款，并扣回对应余额。'}</div>`}
 ${o.payment==='未知'?'<div class="notice warn" style="margin-top:18px">已超过24小时，需人工接管。查询演示保持通道结果未知，不会重新扣款。</div>':''}
 <h3>关联信息</h3><p class="muted">原型参考号：TEST-${esc(o.id)} · 创建时间 ${esc(o.time)}<br><br>每次操作仅更新当前页面内的合成数据，刷新页面后重置。</p>`;
}
function table(rows){return `<div class="table-wrap"><table><thead><tr><th>业务订单 / 类型</th><th>用户 / 商户</th><th>金额</th><th>支付结果</th><th>履约结果</th><th>操作</th></tr></thead><tbody>${rows.map(o=>`<tr><td><div class="id">${o.id}</div><div class="muted" style="margin-top:6px">${o.type} · ${o.time}</div></td><td>${esc(cardFor(o).name)}<div class="muted" style="margin-top:6px">${esc(cardFor(o).merchant)}</div></td><td class="amount">${money(o.amount)}${o.refunded?`<div class="muted">已退 ${money(o.refunded)}</div>`:''}</td><td>${pill(o.payment)}</td><td>${pill(o.fulfillment)}</td><td><button class="link" data-action="detail" data-id="${o.id}">查看详情 →</button></td></tr>`).join('')}</tbody></table></div><div class="table-foot"><span>共 ${rows.length} 条 · 合成数据</span><span>第 1 / 1 页</span></div>`;}
function filters(){return `<div class="filters"><input id="search" aria-label="搜索订单" placeholder="搜索订单号、用户、商户" value="${esc(search)}"><select id="status" aria-label="支付状态"><option value="all">全部支付状态</option>${['成功','未知','失败'].map(s=>`<option ${s===status?'selected':''}>${s}</option>`).join('')}</select><button data-action="search">查询</button><button data-action="clear">重置筛选</button><span class="muted">金额币种 CAD</span></div>`;}
function empty(title='没有符合条件的记录',sub='请调整搜索条件或切换授权范围。'){return `<div class="empty"><strong>${title}</strong>${sub}</div>`;}
function ordersPage(){const rows=currentRows();return `<div class="panel"><div class="panel-head"><strong>交易记录</strong><span class="muted">支付与履约结果分别展示</span></div>${filters()}${rows.length?table(rows):empty()}</div>`;}
function simpleTable(headers,rows){return `<div class="panel table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table>${!rows.length?empty('暂无记录','完成相关演示操作后，这里会出现记录。'):''}</div>`;}
function content(){
 const list=visibleOrders(),cs=cards.filter(c=>merchantVisible(c.merchantId));
 if(['roles','operators'].includes(page))return accessPage(page);
 if(['users','merchants','products','cards'].includes(page))return managementPage(page);
 if(page==='orders')return ordersPage();
 if(page==='refunds')return `<div class="notice">授权人员直接执行并审计。消费退款恢复卡余额；购卡／充值退款退回原银行卡，且仅限从未消费的卡。</div>${simpleTable(['退款号 / 原订单','金额','去向','状态','操作'],refunds.filter(r=>allowed(orders.find(o=>o.id===r.order))).map(r=>[r.id+'<br><span class="muted">'+r.order+'</span>',money(r.amount),r.kind==='消费'?'原储值卡余额':'原银行卡',pill(r.state),r.state==='处理中'?`<button class="link" data-action="settle-refund" data-id="${r.id}" ${!canMutate?'disabled':''}>查询模拟结果 →</button>`:'已完成']))}`;
 if(page==='exceptions')return `<div class="notice warn">已收款待履约与支付未知分开处理。恢复履约不再次收款；超过24小时未知转人工，仍保留未知结果。</div>${simpleTable(['业务号','商户','异常','金额','操作'],list.filter(o=>o.fulfillment==='待恢复'||o.payment==='未知').map(o=>[o.id,cardFor(o).merchant,o.payment==='未知'?'支付未知 · 已转人工':'收款成功 · 充值待恢复',money(o.amount),`<button class="link" data-action="detail" data-id="${o.id}">处理详情 →</button>`]))}`;
 if(page==='ledger')return `<div class="notice">这里只展示本原型场景对应的资金发生记录，不是完整总账。恢复和退款成功会追加演示记录；不提供直接改余额。</div>${simpleTable(['关联业务','储值卡','资金事件','发生金额'],ledger.filter(l=>allowed(orders.find(o=>o.id===l.order))).map(l=>[l.order,l.card,l.type,`<span class="amount">${l.amount>0?'+':''}${money(l.amount)}</span>`]))}`;
 if(page==='recon'){
 const ds=differences.filter(d=>merchantVisible(d.merchantId));
 return `<div class="panel" style="margin-bottom:19px"><div class="panel-head"><div><div class="eyebrow">模拟核对批次</div><strong>REC-20261024-01</strong></div>${pill('已完成')}</div><div class="panel-body mini-summary"><span>未解决差异 <strong>${ds.filter(d=>d.state!=='已解决').length}</strong></span><span class="muted">来源：模拟通道账单 · 非沙箱真实账单<br>业务日期：2026-10-24 · 本轮仅演示差异处理</span></div></div><div class="notice">批次运行完成不代表差异全部解决。仅展示当前授权范围的差异，不提供混合商户批次总额。</div>${simpleTable(['差异 / 原订单','商户','差异类型','本地 / 通道','处理状态','操作'],ds.map(d=>[d.id+'<br>'+d.order,d.merchant,d.type,money(d.local)+'<br>'+money(d.channel),pill(d.state),`<button class="link" data-action="difference" data-id="${d.id}">核实差异 →</button>`]))}`;
 }
 if(page==='audit')return `<div class="notice">演示操作只追加记录，不覆盖历史。刷新页面会重置全部内存数据；正式系统需持久保存审计。</div><div class="panel">${audits.filter(a=>scope==='all'||a.merchantId===scope).map(a=>`<div class="audit-item"><strong>${esc(a.action)}</strong> · ${esc(a.target)}<span class="muted" style="float:right">${esc(a.time)}</span><br>操作者：${esc(a.operator)} · ${esc(a.result)}<br><span class="muted">原因：${esc(a.reason)}</span>${a.before!==undefined?`<br>变更前：${esc(a.before)}<br>变更后：${esc(a.after)}`:''}</div>`).join('')||empty('暂无操作审计','执行退款、查单或异常恢复后查看。')}</div>`;
}
function render(){
 const pageDescriptions={orders:'查清每一笔收款与到账，处理订单和售后。',users:'查看用户、银行卡与持卡关系。',merchants:'维护商户资料与状态，查看所属卡产品。',products:'产品归属商户，分别配置售卖与充值规则。',cards:'总余额、预留与可用余额分开查看。',refunds:'原交易、退款去向与执行结果可追踪。',exceptions:'先确认资金事实，再执行受控恢复。',ledger:'从业务订单追踪每一笔余额变化。',recon:'区分核对完成与差异解决。',audit:'关键操作有原因、有记录、可追溯。',roles:'自定义角色，按预置权限树配置菜单及操作能力。',operators:'为操作员分配角色和独立的数据范围。'};
 $('#app').innerHTML=`<aside><div class="brand">Snap<span>Pay</span></div><div class="brand-sub">OPERATIONS CONSOLE</div><nav aria-label="后台主导航">${navigation()}</nav><footer>LOCAL PROTOTYPE v0.6<br>加拿大业务 · CAD<br>仅合成数据 · 无真实资金</footer></aside><div class="shell"><header class="topbar"><strong>运营工作台 <span class="muted"> / ${pageGroup().label} / ${pages[page]}</span></strong><div class="topbar-controls"><label for="scope">数据范围</label><select id="scope"><option value="all">平台 · 全部商户</option>${demoMerchants.map(m=>`<option value="${m.id}" ${scope===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select><select id="permission" aria-label="演示权限"><option value="write">综合演示权限</option><option value="funds">资金操作</option><option value="config">配置维护</option><option value="read">只读权限</option></select><span class="avatar">演</span></div></header><div class="prototype-banner"><span>交互原型 · 所有操作仅修改内存中的合成数据</span><span>刷新可重置 · 不接支付通道</span></div><main><div class="title-row"><div><div class="eyebrow">${pageGroup().label} / ${pages[page]}</div><h1>${pages[page]}</h1><div class="muted">${pageDescriptions[page]}</div></div><div style="display:flex;gap:8px"><select id="demo-mode" aria-label="页面状态演示"><option value="normal">正常数据</option><option value="empty" ${demoMode==='empty'?'selected':''}>空数据</option><option value="error" ${demoMode==='error'?'selected':''}>读取失败</option></select><button data-action="reset">重置演示</button></div></div>${demoMode==='normal'?content():`<div class="panel">${empty(demoMode==='error'?'数据读取失败':'暂无数据',demoMode==='error'?'这是可切换的页面状态演示，不会将查询错误显示为空列表。':'这是空列表状态演示。')}<div style="text-align:center;padding-bottom:25px"><button data-action="normal">${demoMode==='error'?'重新加载':'恢复演示数据'}</button></div></div>`}<p class="page-note">评审重点：信息是否够用、操作顺序是否清楚、状态是否易于判断。用户注册／绑卡／付款不在后台代办。</p></main></div>`;
 $('#scope').value=scope;$('#permission').value=permissionMode;
}
function showModal(title,body){$('#modal').innerHTML=`<div class="modal-head"><h2>${title}</h2><button data-action="close" aria-label="关闭弹窗">✕</button></div><div class="modal-body">${body}</div>`;if(!$('#modal').open)$('#modal').showModal();}
function showRefund(o){
 const block=refundBlock(o);
 if(block){showModal('暂不能执行退款',`<div class="notice warn">${esc(block)}</div><p>原订单：<strong>${o.id}</strong></p>${o.type==='购卡'?'<p class="muted">可先从订单 SP-241003 执行充值退款，查询完成后再退购卡。</p>':''}<div class="modal-footer"><button data-action="close">知道了</button></div>`);return;}
 showModal(o.type==='消费'?'执行消费退款':'执行原路退款',`<div class="notice">${o.type==='消费'?'退款恢复原储值卡余额，不退银行卡。':'仅限从未消费的卡，指定订单全额退原银行卡；提交后先预留对应余额。'}</div><div class="detail-grid"><div><label>原订单</label>${o.id}</div><div><label>退款去向</label>${o.type==='消费'?o.card:esc(o.bank)}</div><div><label>商户</label>${esc(cardFor(o).merchant)}</div><div><label>剩余可退</label>${money(o.amount-o.refunded)}</div></div><form id="refund-form" data-id="${o.id}"><label for="refund-amount">退款金额（CAD）</label><input id="refund-amount" name="amount" inputmode="decimal" type="text" value="${((o.amount-o.refunded)/100).toFixed(2)}" ${o.type!=='消费'?'readonly':''} required><label for="refund-reason">退款原因</label><textarea id="refund-reason" name="reason" required placeholder="请输入本次退款原因"></textarea><div class="form-error" id="form-error" role="alert"></div><div class="modal-footer"><button type="button" data-action="close">取消</button><button class="primary" type="submit">确认执行退款</button></div><p class="page-note">当前有退款权限人员直接执行，操作会留审计；不需要第二人复核。</p></form>`);
}
function closeModal(){if($('#modal').open)$('#modal').close();}
document.addEventListener('click',event=>{
 const btn=event.target.closest('[data-action]');if(!btn||btn.disabled)return;
 const a=btn.dataset.action,id=btn.dataset.id,o=orders.find(x=>x.id===id);
 if(a==='close'){closeModal();return;}
 if(handleAccessClick(a,id))return;
 if(handleManagementClick(a,id))return;
 if(a==='nav'){page=id;if(id==='products')productMerchantFilter='all';search='';status='all';task='all';render();return;}
 if(a==='select'){selected=id;render();return;}
 if(a==='detail'){if(!o||!allowed(o))return;showModal('订单详情',details(o,true));return;}
 if(a==='refund'){if(o&&allowed(o))showRefund(o);return;}
 if(a==='search'){search=$('#search').value.trim();status=$('#status').value;render();return;}
 if(a==='clear'){search='';status='all';task='all';render();return;}
 if(a==='task'){task=id;render();return;}
 if(a==='reset'){reset();closeModal();render();notify('合成数据已重置');return;}
 if(a==='normal'){demoMode='normal';render();return;}
 if(a==='related-ledger'){closeModal();page='ledger';render();notify('展示授权范围的演示账务；按关联业务号查找原订单');return;}
 if(a==='recover'){
  if(!canMutate||!o||!allowed(o)||o.fulfillment!=='待恢复')return;
  showModal('恢复充值',`<div class="notice">收款已确认成功，本次仅恢复充值 ${money(o.amount)}，不会再次向银行卡收款。</div><form id="recover-form" data-id="${id}"><label for="recover-reason">处理原因</label><textarea id="recover-reason" name="reason" required placeholder="说明恢复依据"></textarea><div class="modal-footer"><button type="button" data-action="close">取消</button><button class="primary">确认恢复</button></div></form>`);return;
 }
 if(a==='query'){
  if(!o||!allowed(o))return;
  audit('查询未知支付',o.id,'核实原支付，无新收款请求','模拟通道仍返回未知，保留人工接管');closeModal();render();notify('查询结果仍未知；未发起新扣款');return;
 }
 if(a==='settle-refund'){
  const r=refunds.find(x=>x.id===id);if(!r||!canMutate||r.state!=='处理中')return;const original=orders.find(x=>x.id===r.order);if(!allowed(original))return;
  const c=cardFor(original);c.reserved-=r.amount;c.balance-=r.amount;original.refunded+=r.amount;r.state='已完成';ledger.unshift({order:original.id,card:c.id,type:'原路退款扣回',amount:-r.amount});
  if(original.type==='购卡'&&c.balance===0)c.state='关闭';audit('查询原路退款并结转',original.id,r.reason,'模拟通道成功，余额扣回'+(c.state==='关闭'?'，储值卡已关闭':''));render();notify('原路退款已完成，已扣回对应余额'+(c.state==='关闭'?'并关卡':''));return;
 }
 if(a==='difference'){
  const d=differences.find(x=>x.id===id);if(!d||(scope!=='all'&&scope!==d.merchantId))return;
  showModal('核实对账差异',`<p><strong>${d.id}</strong> · ${d.order}</p><div class="notice">${esc(d.type)}。仅修改差异状态不能修复资金。</div><div class="detail-grid"><div><label>本地金额</label>${money(d.local)}</div><div><label>模拟通道金额</label>${money(d.channel)}</div></div>${d.state==='已解决'?`<p>已解决依据：${esc(d.reason)}</p>`:d.id==='DIFF-02'&&orders.find(x=>x.id===d.order).fulfillment==='待恢复'?`<div class="notice warn">此交易尚未恢复履约，请先到异常处理恢复原充值，再回来核实差异。</div><button data-action="detail" data-id="${d.order}">查看关联订单</button>`:`<form id="difference-form" data-id="${id}"><label for="diff-reason">核实依据</label><textarea id="diff-reason" name="reason" required placeholder="例如：已核对模拟更正账单，金额与原交易一致"></textarea><p class="page-note">${d.id==='DIFF-01'?'本次演示会将模拟账单更正为本地金额，再关闭差异，不修改实际支付或余额。':'本次核实履约已恢复，记录依据后关闭差异。'}</p><div class="modal-footer"><button type="button" data-action="close">取消</button><button class="primary" ${!canMutate?'disabled':''}>记录依据并解决</button></div></form>`}`);return;
 }
});
document.addEventListener('submit',event=>{
 event.preventDefault();const form=event.target;if(submitAccess(form)||submitManagement(form))return;const reason=String(new FormData(form).get('reason')||'').trim();if(!reason){form.querySelector('textarea')?.focus();return;}
 const o=orders.find(x=>x.id===form.dataset.id);
 if(form.id==='refund-form'){
  if(!o||!allowed(o))return;const block=refundBlock(o);if(block){$('#form-error').textContent=block;return;}
  const raw=String(new FormData(form).get('amount')).trim();if(!/^\d+(\.\d{1,2})?$/.test(raw)){$('#form-error').textContent='金额仅支持正数，最多两位小数。';return;}
  const [whole,fraction='']=raw.split('.');const amount=Number(whole)*100+Number(fraction.padEnd(2,'0'));
  if(!Number.isSafeInteger(amount)||amount<=0||amount>1000000||amount>o.amount-o.refunded||(o.type!=='消费'&&amount!==o.amount)){$('#form-error').textContent='金额超出本次可退范围或单笔10,000 CAD上限。';return;}
  const c=cardFor(o),r={id:'RF-20261024-'+String(sequence++).padStart(3,'0'),order:o.id,amount,reason,kind:o.type,state:o.type==='消费'?'已完成':'处理中'};refunds.unshift(r);
  if(o.type==='消费'){o.refunded+=amount;c.balance+=amount;ledger.unshift({order:o.id,card:c.id,type:'消费退款入账',amount});audit('执行消费退款',o.id,reason,'已恢复原卡余额 '+money(amount));}
  else{c.reserved+=amount;audit('发起原路退款',o.id,reason,'已预留 '+money(amount)+'，等待模拟通道结果');}
  closeModal();page='refunds';render();notify(o.type==='消费'?'消费退款成功，已恢复原卡余额':'已发起原路退款，请查询模拟结果完成结转');return;
 }
 if(form.id==='recover-form'){
  if(!canMutate||!o||!allowed(o)||o.payment!=='成功'||o.fulfillment!=='待恢复')return;
  o.fulfillment='已到账';cardFor(o).balance+=o.amount;ledger.unshift({order:o.id,card:o.card,type:'充值恢复入账',amount:o.amount});audit('恢复充值',o.id,reason,'只恢复履约 '+money(o.amount)+'，未重新收款');closeModal();render();notify('充值已恢复，未再次收款');return;
 }
 if(form.id==='difference-form'){
  const d=differences.find(x=>x.id===form.dataset.id);if(!canMutate||!d||d.state==='已解决'||(scope!=='all'&&d.merchant!==scope))return;
  if(d.id==='DIFF-02'&&orders.find(x=>x.id===d.order).fulfillment!=='已到账')return;
  d.channel=d.local;d.state='已解决';d.reason=reason;audit('核实对账差异',d.id,reason,'模拟证据已核实，差异已解决；未修改资金');closeModal();render();notify('已记录依据，差异已解决');
 }
});
document.addEventListener('change',event=>{
 if(event.target.id==='scope'){scope=event.target.value;closeModal();render();}
 if(event.target.id==='permission'){permissionMode=event.target.value;canMutate=['write','funds'].includes(permissionMode);closeModal();render();}
 if(event.target.id==='demo-mode'){demoMode=event.target.value;render();}
});
render();

document.addEventListener('toggle',event=>{const group=event.target;if(!group.matches?.('details[data-menu]'))return;if(group.open)expandedMenus.add(group.dataset.menu);else expandedMenus.delete(group.dataset.menu);},true);
