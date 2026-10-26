/* THROWAWAY PROTOTYPE: configuration and state changes; synthetic in-memory data only. */
let demoUsers=[],demoMerchants=[],demoProducts=[];
let permissionMode='write';
let productMerchantFilter='all';
function resetManagement(){
 demoMerchants=[{id:'M-MAPLE',name:'枫叶咖啡',state:'正常',version:0},{id:'M-NORTH',name:'北岸生活',state:'正常',version:0}];
 demoProducts=[{id:'P-CAFE',merchantId:'M-MAPLE',name:'咖啡储值卡',sale:true,topup:true,version:0},{id:'P-LIFE',merchantId:'M-NORTH',name:'生活储值卡',sale:true,topup:true,version:0}];
 demoUsers=[...new Map(cards.map(c=>[c.user,{id:c.user,name:c.name,phone:c.phone,state:'正常',version:0}])).values()];
 cards.forEach(c=>{c.merchantId=c.merchant==='枫叶咖啡'?'M-MAPLE':'M-NORTH';c.productId=c.merchantId==='M-MAPLE'?'P-CAFE':'P-LIFE';c.version=0;});
 differences.forEach(d=>d.merchantId=d.merchant==='枫叶咖啡'?'M-MAPLE':'M-NORTH');
 if(scope!=='all'&&!demoMerchants.some(m=>m.id===scope))scope='all';
 productMerchantFilter='all';
}
const merchantById=id=>demoMerchants.find(m=>m.id===id);
const productById=id=>demoProducts.find(p=>p.id===id);
const merchantVisible=id=>scope==='all'||scope===id;
const userVisible=id=>scope==='all'||cards.some(c=>c.user===id&&merchantVisible(c.merchantId));
function managementPermission(kind){
 if(kind==='user')return permissionMode==='write'&&scope==='all';
 if(kind==='card')return permissionMode==='write';
 return permissionMode==='write'||permissionMode==='config';
}
function managementDisabled(kind){return managementPermission(kind)?'':'disabled';}
function stateRules(c){
 const u=demoUsers.find(x=>x.id===c.user),m=merchantById(c.merchantId),p=productById(c.productId);
 const blocked=[];
 if(u.state==='停用')blocked.push('用户停用');
 if(m.state==='停用')blocked.push('商户停用');
 if(c.state!=='正常')blocked.push('储值卡'+c.state);
 return {blocked,topup:!blocked.length&&p.topup,consume:!blocked.length};
}
function managementPage(kind){
 if(kind==='users'){
  const us=demoUsers.filter(u=>userVisible(u.id));
  return `<div class="notice">后台只查询资料和管理状态，不代用户绑卡或付款。用户停用后仍可登录查询，禁止新增绑卡、新付款、充值和消费；原交易及授权退款继续处理。</div>${scope!=='all'?'<div class="notice warn">当前为单商户范围：仅展示关联用户最小资料；用户全局状态仅平台授权可修改，平台银行卡不显示。</div>':''}${simpleTable(['用户','手机号','状态','关联资料与操作'],us.map(u=>[`${esc(u.name)}<div class="muted">${u.id}</div>`,esc(u.phone),pill(u.state),`<button class="link" data-action="manage-user" data-id="${u.id}">查看资料 →</button><br><button class="link" data-action="manage-user-state" data-id="${u.id}" ${managementDisabled('user')}>${u.state==='正常'?'停用用户':'恢复用户'}</button>`]))}<p class="page-note">${managementPermission('user')?'当前综合演示账号显式具备平台用户状态权限。':'当前权限或数据范围不允许修改用户全局状态。'}</p>`;
 }
 if(kind==='merchants'){
  const ms=demoMerchants.filter(m=>merchantVisible(m.id));
  return `<div class="notice">维护商户资料和状态。商户停用禁止该商户的新购卡、充值和消费；查询、授权退款及已有交易结果处理保留。</div><div class="section-heading"><h2>商户列表</h2><button class="primary" data-action="manage-merchant-new" ${!managementPermission('merchant')||scope!=='all'?'disabled':''}>新增商户</button></div>${simpleTable(['商户','状态','卡产品数量','操作'],ms.map(m=>[`${esc(m.name)}<div class="muted">${m.id}</div>`,pill(m.state),String(demoProducts.filter(p=>p.merchantId===m.id).length),`<button class="link" data-action="manage-merchant-edit" data-id="${m.id}" ${managementDisabled('merchant')}>编辑配置 →</button><br><button class="link" data-action="manage-merchant-products" data-id="${m.id}">查看所属产品 →</button>`]))}<p class="page-note">左侧“商户 → 产品管理”维护卡产品；也可从商户行进入，仅查看该商户的产品。</p>`;
 }
 if(kind==='products'){
  const ms=demoMerchants.filter(m=>merchantVisible(m.id));
  if(productMerchantFilter!=='all'&&!ms.some(m=>m.id===productMerchantFilter))productMerchantFilter='all';
  const ps=demoProducts.filter(p=>merchantVisible(p.merchantId)&&(productMerchantFilter==='all'||p.merchantId===productMerchantFilter));
  return `<div class="notice">卡产品隶属商户，固定CAD、无赠送、仅在所属商户使用；编辑不改变所属商户或历史金额。</div><div class="section-heading"><h2>卡产品列表</h2><button class="primary" data-action="manage-product-new" ${!managementPermission('product')||!ms.length?'disabled':''}>新增卡产品</button></div><div class="panel" style="margin-bottom:16px"><div class="filters"><label for="product-merchant-filter">所属商户</label><select id="product-merchant-filter"><option value="all">全部授权商户</option>${ms.map(m=>`<option value="${m.id}" ${productMerchantFilter===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select><span class="muted">共 ${ps.length} 个产品</span></div></div>${simpleTable(['产品 / 所属商户','币种','新购卡','充值','操作'],ps.map(p=>[`${esc(p.name)}<div class="muted">${p.id} · ${esc(merchantById(p.merchantId).name)}</div>`,'CAD',pill(p.sale?'可售':'停售'),pill(p.topup?'可充值':'暂停充值'),`<button class="link" data-action="manage-product-edit" data-id="${p.id}" ${managementDisabled('product')}>编辑配置 →</button>`]))}<p class="page-note">停售仅阻止新购卡；暂停充值不禁止已有卡消费。商户停用仍会禁止所属商户的新购卡、充值及消费。</p>`;
 }
 if(kind==='cards'){
  const cs=cards.filter(c=>merchantVisible(c.merchantId));
  return `<div class="notice">冻结后禁止新付款、充值和消费；允许查询及有权限人员退款。关闭仅由符合顺序的购卡退款完成触发，不提供手工关卡。</div>${simpleTable(['储值卡 / 用户','商户 / 产品','状态','总余额','退款预留','可用余额','操作'],cs.map(c=>[`${c.id}<div class="muted">${c.user}</div>`,`${esc(c.merchant)}<div class="muted">${esc(c.product)}</div>`,pill(c.state),money(c.balance),money(c.reserved),money(c.balance-c.reserved),`<button class="link" data-action="manage-card" data-id="${c.id}">查看详情 →</button><br><button class="link" data-action="manage-card-state" data-id="${c.id}" ${!managementPermission('card')||c.state==='关闭'?'disabled':''}>${c.state==='冻结'?'解冻卡':'冻结卡'}</button>`]))}`;
 }
}
function showUserManagement(id){
 const u=demoUsers.find(u=>u.id===id);if(!u||!userVisible(id))return;
 const cs=cards.filter(c=>c.user===id&&merchantVisible(c.merchantId));
 showModal('用户资料与状态',`<h2>${esc(u.name)} · ${u.id}</h2><p>${esc(u.phone)} · ${pill(u.state)}</p><div class="notice">${u.state==='停用'?'可登录查询；禁止新增绑卡、新付款、充值和消费。':'正常用户可通过用户接口执行符合规则的交易。'}后台不代用户付款。</div><div class="actions"><button data-action="manage-user-state" data-id="${u.id}" ${managementDisabled('user')}>${u.state==='正常'?'停用用户':'恢复用户'}</button></div><h3>资金来源银行卡</h3>${scope==='all'?simpleTable(['绑定标识','卡信息','状态'],[['BIND-'+u.id+'-01','Visa · 4242',pill('正常')],['BIND-'+u.id+'-02','Mastercard · 5556',pill('正常')]]):'<div class="notice">单商户范围不显示平台银行卡资料。</div>'}<h3>授权范围持卡</h3>${simpleTable(['储值卡','商户','状态','余额'],cs.map(c=>[c.id,esc(c.merchant),pill(c.state),money(c.balance)]))}<p class="page-note">版本 v${u.version} · 仅合成资料，无Token、完整卡号或CVV。</p>`);
}
function showCardManagement(id){
 const c=cards.find(c=>c.id===id);if(!c||!merchantVisible(c.merchantId))return;
 const r=stateRules(c),u=demoUsers.find(u=>u.id===c.user);
 showModal('储值卡详情',`<div class="details-title"><h2>${c.id}</h2>${pill(c.state)}</div><div class="detail-grid"><div><label>持卡用户</label>${esc(u.name)} · ${u.id} · ${pill(u.state)}</div><div><label>商户 / 产品</label>${esc(c.merchant)} / ${esc(c.product)}</div><div><label>是否曾发生消费</label>${c.consumed?'是；消费退款后也不恢复未消费资格':'否'}</div><div><label>修改版本</label>v${c.version}</div></div><div class="balance-grid"><div>总余额<strong>${money(c.balance)}</strong></div><div>退款预留<strong>${money(c.reserved)}</strong></div><div>可用余额<strong>${money(c.balance-c.reserved)}</strong></div></div><div class="notice" style="margin-top:18px">当前新充值：${r.topup?'允许':'禁止'}；新消费：${r.consume?'允许':'禁止'}。${r.blocked.length?'限制原因：'+r.blocked.map(esc).join('、')+'。':''}${!productById(c.productId).topup?'产品已暂停充值。':''}最终交易仍须校验归属、金额及余额，本页不发起用户交易。</div><div class="actions"><button data-action="manage-card-state" data-id="${c.id}" ${!managementPermission('card')||c.state==='关闭'?'disabled':''}>${c.state==='冻结'?'解冻卡':'冻结卡'}</button></div><p class="page-note">授权退款仍按原单规则执行。冻结不扣余额，不丢弃在途收款结果。</p>`);
}
function showStateChange(kind,id){
 const u=kind==='user'?demoUsers.find(x=>x.id===id):cards.find(x=>x.id===id);
 if(!u||!managementPermission(kind)||(kind==='user'?!userVisible(id):!merchantVisible(u.merchantId))||(kind==='card'&&u.state==='关闭'))return;
 const next=kind==='user'?(u.state==='正常'?'停用':'正常'):(u.state==='正常'?'冻结':'正常');
 const title=kind==='user'?(next==='停用'?'停用用户':'恢复用户'):(next==='冻结'?'冻结储值卡':'解冻储值卡');
 const impact=kind==='user'?(next==='停用'?'仍可登录查询；禁止新增绑卡、新付款、充值和消费。已有付款和退款继续按原记录处理。':'恢复用户交易资格，具体交易仍受卡、产品及商户状态限制。'):(next==='冻结'?'禁止关联的新付款、充值和消费；查询及授权退款仍可进行。不扣回余额，不自动退款，不丢弃在途结果。':'解除卡冻结；用户停用、商户停用或产品暂停充值等限制仍然有效。');
 showModal(title,`<div class="detail-grid"><div><label>操作对象</label>${esc(kind==='user'?u.name+' · '+id:'储值卡 '+id)}</div><div><label>状态变化</label>${pill(u.state)} → ${pill(next)}</div></div><div class="notice warn">${impact}</div><form id="management-state-form" data-kind="${kind}" data-id="${id}" data-version="${u.version}" data-next="${next}"><label for="management-reason">操作原因</label><textarea id="management-reason" name="reason" maxlength="500" required placeholder="填写状态调整原因"></textarea><div id="management-error" class="form-error" role="alert"></div><div class="modal-footer"><button type="button" data-action="close">取消</button><button class="primary" type="submit">确认${title}</button></div></form>`);
}
function showConfiguration(kind,id){
 const isNew=!id,collection=kind==='merchant'?demoMerchants:demoProducts,record=collection.find(x=>x.id===id);
 if(!managementPermission(kind)||(!isNew&&(!record||!merchantVisible(kind==='merchant'?id:record.merchantId)))||(isNew&&kind==='merchant'&&scope!=='all'))return;
 const ms=demoMerchants.filter(m=>merchantVisible(m.id));if(kind==='product'&&!ms.length)return;
 const name=kind==='merchant'?'商户':'卡产品';
 const relation=kind==='product'?(isNew?`<label for="config-merchant">所属商户</label><select id="config-merchant" name="merchantId">${ms.map(m=>`<option value="${m.id}" ${productMerchantFilter===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select>`:`<p>所属商户：${esc(merchantById(record.merchantId).name)} · ${record.merchantId}（不可变更）</p>`):'';
 const settings=kind==='merchant'?`<label for="config-state">商户状态</label><select id="config-state" name="state"><option value="正常">正常</option><option value="停用" ${record?.state==='停用'?'selected':''}>停用</option></select><div class="notice warn" style="margin-top:15px">停用会禁止该商户的新购卡、充值和消费；保留查询、授权退款与已有交易结果处理。</div>`:`<p>币种：CAD（固定） · 无赠送金额</p><label for="config-sale">新购卡</label><select id="config-sale" name="sale"><option value="true">可售</option><option value="false" ${record?.sale===false?'selected':''}>停售</option></select><label for="config-topup">储值卡充值</label><select id="config-topup" name="topup"><option value="true">可充值</option><option value="false" ${record?.topup===false?'selected':''}>暂停充值</option></select><p class="page-note">停售不影响已有卡消费；暂停充值不冻结已有余额。商户停用仍优先限制新交易。</p>`;
 showModal((isNew?'新增':'编辑')+name,`<form id="management-config-form" data-kind="${kind}" data-id="${id||''}" data-version="${record?.version??-1}"><label for="config-name">${name}名称</label><input id="config-name" type="text" name="name" required maxlength="100" value="${esc(record?.name||'')}">${relation}${settings}<label for="config-reason">${isNew?'配置依据':'修改原因'}</label><textarea id="config-reason" name="reason" required maxlength="500" placeholder="填写本次配置原因"></textarea><div id="management-error" class="form-error" role="alert"></div><div class="modal-footer"><button type="button" data-action="close">取消</button><button class="primary" type="submit">${isNew?'确认新增':'保存配置'}</button></div><p class="page-note">${isNew?'新增后可在当前列表查看；不会自动生成用户卡或交易。':'只修改可编辑配置；不修改历史订单金额、商户归属或卡余额。'}</p></form>`);
}
function handleManagementClick(action,id){
 if(!action.startsWith('manage-'))return false;
 if(action==='manage-merchant-products'){if(!merchantVisible(id)||!merchantById(id))return true;productMerchantFilter=id;page='products';expandedMenus.add('merchant');render();return true;}
 if(action==='manage-user')showUserManagement(id);
 if(action==='manage-card')showCardManagement(id);
 if(action==='manage-user-state')showStateChange('user',id);
 if(action==='manage-card-state')showStateChange('card',id);
 if(action==='manage-merchant-new')showConfiguration('merchant');
 if(action==='manage-product-new')showConfiguration('product');
 if(action==='manage-merchant-edit')showConfiguration('merchant',id);
 if(action==='manage-product-edit')showConfiguration('product',id);
 return true;
}
function submitManagement(form){
 if(!form.id.startsWith('management-'))return false;
 const f=new FormData(form),reason=String(f.get('reason')||'').trim(),kind=form.dataset.kind,id=form.dataset.id;
 const fail=message=>{form.querySelector('#management-error').textContent=message;return true;};
 if(!reason)return fail('请填写操作原因。');
 if(!managementPermission(kind))return fail('当前无此操作权限，未保存。');
 if(form.id==='management-state-form'){
  const item=kind==='user'?demoUsers.find(x=>x.id===id):cards.find(x=>x.id===id);
  if(!item||(kind==='user'?!userVisible(id):!merchantVisible(item.merchantId)))return fail('不在授权数据范围内。');
  if(item.version!==Number(form.dataset.version))return fail('对象已发生变化，请关闭并重新读取后操作。');
  if(kind==='card'&&item.state==='关闭')return fail('已关闭卡不可冻结或重新激活。');
  const before=item.state;item.state=form.dataset.next;item.version++;
  audit(kind==='user'?'变更用户状态':'变更储值卡状态',id,reason,before+' → '+item.state,{merchantId:kind==='card'?item.merchantId:'平台',before,after:item.state});
  closeModal();render();notify('状态已更新，原因及前后状态已记入演示审计');return true;
 }
 if(form.id==='management-config-form'){
  const collection=kind==='merchant'?demoMerchants:demoProducts,isNew=!id,item=collection.find(x=>x.id===id),name=String(f.get('name')||'').trim();
  if(!name||name.length>100)return fail('名称需为1—100个字符。');
  if(!isNew&&(!item||!merchantVisible(kind==='merchant'?id:item.merchantId)))return fail('不在授权数据范围内。');
  if(!isNew&&item.version!==Number(form.dataset.version))return fail('配置已变化，请重新读取后操作。');
  if(isNew&&kind==='merchant'&&scope!=='all')return fail('仅平台授权可新增商户。');
  const merchantId=kind==='merchant'?(id||'M-DEMO-'+String(demoMerchants.length+1).padStart(3,'0')):(item?.merchantId||String(f.get('merchantId')));
  if(kind==='product'&&(!merchantById(merchantId)||!merchantVisible(merchantId)))return fail('所属商户无效或不在授权范围内。');
  const describe=r=>kind==='merchant'?`${r.name} · ${r.state}`:`${r.name} · ${r.sale?'可售':'停售'} · ${r.topup?'可充值':'暂停充值'}`;
  const before=isNew?'不存在':describe(item),record=item||{id:kind==='merchant'?merchantId:'P-DEMO-'+String(demoProducts.length+1).padStart(3,'0'),version:0};
  record.name=name;
  if(kind==='merchant')record.state=String(f.get('state'));
  else{record.merchantId=merchantId;record.sale=f.get('sale')==='true';record.topup=f.get('topup')==='true';}
  if(isNew)collection.push(record);else record.version++;
  cards.forEach(c=>{c.merchant=merchantById(c.merchantId).name;c.product=productById(c.productId).name;});
  differences.forEach(d=>d.merchant=merchantById(d.merchantId).name);
  audit((isNew?'新增':'修改')+(kind==='merchant'?'商户配置':'卡产品配置'),record.id,reason,'已保存；未修改资金',{merchantId,before,after:describe(record)});
  closeModal();render();notify('配置已保存，变更已记入演示审计');return true;
 }
 return false;
}

document.addEventListener('change',event=>{if(event.target.id==='product-merchant-filter'){productMerchantFilter=event.target.value;render();}});
