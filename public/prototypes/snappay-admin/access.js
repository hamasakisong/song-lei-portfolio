/* THROWAWAY: custom roles over a fixed permission catalog. No real accounts or sessions. */
const permissionCatalog=[
 ['公共基础','角色与操作员','access.manage','管理角色及操作员授权',[],true],['公共基础','操作审计','audit.read','查询操作审计',[],false],
 ['用户管理','用户与银行卡','user.read','查询用户资料',[],false],['用户管理','用户与银行卡','user.status.write','停用／恢复用户',['user.read'],true],['用户管理','用户与银行卡','bank-binding.read','查询脱敏银行卡',['user.read'],true],
 ['商户','商户管理','merchant.read','查询商户',[],false],['商户','商户管理','merchant.write','新增／编辑商户',['merchant.read'],false],['商户','产品管理','product.read','查询产品',['merchant.read'],false],['商户','产品管理','product.write','新增／编辑产品',['product.read'],false],
 ['卡片管理','储值卡','card.read','查询卡及余额',[],false],['卡片管理','储值卡','card.status.write','冻结／解冻卡',['card.read'],false],
 ['交易管理','订单','order.read','查询订单及退款',[],false],['交易管理','退款','refund.execute','直接执行退款',['order.read'],false],['交易管理','异常处理','recovery.execute','查单及受控恢复',['order.read'],false],
 ['账务会计管理','账务','ledger.read','查询资金记录',[],false],['清结算管理','对账','reconciliation.read','查询批次及差异',[],false],['清结算管理','对账','reconciliation.run','导入／运行对账',['reconciliation.read'],true],['清结算管理','对账','reconciliation.resolve','解决对账差异',['reconciliation.read'],false]
];
let demoRoles=[],demoOperators=[];
function resetAccess(){
 demoRoles=[{id:'ROLE-ADMIN',name:'平台授权维护',enabled:true,codes:['access.manage','audit.read'],version:0},{id:'ROLE-QUERY',name:'运营查询',enabled:true,codes:['user.read','merchant.read','product.read','card.read','order.read'],version:0}];
 demoOperators=[{id:'DEMO-ADMIN',account:'demo-admin',roles:['ROLE-ADMIN'],scopeType:'PLATFORM',merchantIds:[],version:0},{id:'DEMO-OPS',account:'demo-ops',roles:['ROLE-QUERY'],scopeType:'MERCHANTS',merchantIds:['M-MAPLE'],version:0}];
}
const canManageAccess=()=>permissionMode==='write'&&scope==='all';
function effectiveCodes(roleIds,scopeType){
 const codes=new Set(demoRoles.filter(r=>r.enabled&&roleIds.includes(r.id)).flatMap(r=>r.codes));
 return permissionCatalog.filter(p=>codes.has(p[2])&&(scopeType==='PLATFORM'||!p[5])).map(p=>p[2]);
}
function accessPage(kind){
 if(!canManageAccess())return `<div class="panel">${empty('无账号授权管理权限','本演示仅平台范围的综合权限可维护角色与账号授权。')}</div>`;
 if(kind==='roles')return `<div class="notice">自定义角色，勾选系统预置的菜单及按钮权限。权限树结构与权限点由系统维护，本页不新增菜单或权限节点。以下角色与账号均为合成资料。</div><div class="section-heading"><h2>角色列表</h2><button class="primary" data-action="access-role-new">新增角色</button></div>${simpleTable(['角色','状态','权限点','操作'],demoRoles.map(r=>[`${esc(r.name)}<div class="muted">${r.id}</div>`,pill(r.enabled?'启用':'停用'),String(r.codes.length),`<button class="link" data-action="access-role-edit" data-id="${r.id}">配置权限 →</button>`]))}`;
 return `<div class="notice">操作员可分配多个自定义角色；有效操作权限取启用角色的并集，数据范围单独配置。平台专有权限在单商户范围不生效。此处不创建真实账号或修改登录密码。</div>${simpleTable(['操作员','角色','数据范围','有效权限','操作'],demoOperators.map(o=>[esc(o.account),o.roles.map(id=>esc(demoRoles.find(r=>r.id===id)?.name||id)).join('、')||'未分配',o.scopeType==='PLATFORM'?'平台全部':o.merchantIds.map(id=>esc(merchantById(id)?.name||id)).join('、'),String(effectiveCodes(o.roles,o.scopeType).length),`<button class="link" data-action="access-operator" data-id="${o.id}">分配角色与范围 →</button>`]))}`;
}
function roleForm(id){
 if(!canManageAccess())return;const role=demoRoles.find(r=>r.id===id),selected=new Set(role?.codes||[]);
 const tree=[...new Set(permissionCatalog.map(p=>p[0]))].map(group=>`<details class="permission-group" ${group==='交易管理'||permissionCatalog.some(p=>p[0]===group&&selected.has(p[2]))?'open':''}><summary>${esc(group)}</summary>${[...new Set(permissionCatalog.filter(p=>p[0]===group).map(p=>p[1]))].map(page=>`<div class="permission-page"><strong>${esc(page)}</strong>${permissionCatalog.filter(p=>p[0]===group&&p[1]===page).map(p=>`<label class="check-row"><input type="checkbox" name="permissions" value="${p[2]}" ${selected.has(p[2])?'checked':''}><span>${esc(p[3])}${p[5]?' <small>平台专有</small>':''}</span></label>`).join('')}</div>`).join('')}</details>`).join('');
 showModal(role?'编辑角色权限':'新增角色',`<form id="access-role-form" data-id="${id||''}" data-version="${role?.version??-1}"><label for="role-name">角色名称</label><input type="text" id="role-name" name="name" maxlength="60" required value="${esc(role?.name||'')}"><label for="role-enabled">角色状态</label><select id="role-enabled" name="enabled"><option value="true">启用</option><option value="false" ${role?.enabled===false?'selected':''}>停用</option></select><h3>预置权限树</h3><p class="muted">勾选动作会补齐依赖查询权限；取消被依赖项会一并取消相关动作。菜单可见不代表自动拥有其全部操作。</p>${tree}<label for="access-reason">配置原因</label><textarea id="access-reason" name="reason" required maxlength="500"></textarea><div id="access-error" class="form-error" role="alert"></div><div class="modal-footer"><button type="button" data-action="close">取消</button><button class="primary">保存角色权限</button></div></form>`);
}
function operatorForm(id){
 if(!canManageAccess())return;const o=demoOperators.find(o=>o.id===id);if(!o)return;
 showModal('分配角色与数据范围',`<h2>${esc(o.account)}</h2><form id="access-operator-form" data-id="${id}" data-version="${o.version}"><h3>角色（可多选）</h3>${demoRoles.map(r=>`<label class="check-row"><input type="checkbox" name="roles" value="${r.id}" ${o.roles.includes(r.id)?'checked':''}><span>${esc(r.name)}${r.enabled?'':'（已停用，不提供有效权限）'}</span></label>`).join('')}<label for="operator-scope">数据范围</label><select id="operator-scope" name="scopeType"><option value="PLATFORM">平台全部商户</option><option value="MERCHANTS" ${o.scopeType==='MERCHANTS'?'selected':''}>指定商户</option></select><fieldset id="scope-merchants" ${o.scopeType==='PLATFORM'?'disabled':''}><legend>授权商户</legend>${demoMerchants.map(m=>`<label class="check-row"><input type="checkbox" name="merchants" value="${m.id}" ${o.merchantIds.includes(m.id)?'checked':''}><span>${esc(m.name)}</span></label>`).join('')}</fieldset><div class="notice" style="margin-top:16px">平台专有权限在指定商户范围不生效。账号未分配角色时无业务权限；角色停用后不贡献有效权限。已确认授权变更需撤销受影响账号全部后台会话，重新登录。本演示没有真实会话，不验证撤权效果。</div><label for="access-reason">授权原因</label><textarea id="access-reason" name="reason" required maxlength="500"></textarea><div id="access-error" class="form-error" role="alert"></div><div class="modal-footer"><button type="button" data-action="close">取消</button><button class="primary">保存账号授权</button></div></form>`);
}
function handleAccessClick(action,id){
 if(!action.startsWith('access-'))return false;
 if(action==='access-role-new')roleForm();
 if(action==='access-role-edit')roleForm(id);
 if(action==='access-operator')operatorForm(id);
 return true;
}
function submitAccess(form){
 if(!form.id.startsWith('access-'))return false;
 const fail=message=>{form.querySelector('#access-error').textContent=message;return true;};
 if(!canManageAccess())return fail('当前无平台授权管理权限。');
 const f=new FormData(form),reason=String(f.get('reason')||'').trim();if(!reason)return fail('请填写配置原因。');
 if(form.id==='access-role-form'){
  const id=form.dataset.id,r=demoRoles.find(r=>r.id===id),name=String(f.get('name')||'').trim(),codes=f.getAll('permissions');
  if(!name)return fail('请输入角色名称。');
  if(demoRoles.some(x=>x.id!==id&&x.name===name))return fail('角色名称已存在。');
  if(id&&(!r||r.version!==Number(form.dataset.version)))return fail('角色已变化，请重新读取。');
  if(codes.some(code=>!permissionCatalog.some(p=>p[2]===code)))return fail('包含无效权限点。');
  if(codes.some(code=>permissionCatalog.find(p=>p[2]===code)[4].some(dep=>!codes.includes(dep))))return fail('请补齐依赖的查询权限。');
  const before=r?`${r.name}；${r.enabled?'启用':'停用'}；${r.codes.join('、')}`:'不存在',record=r||{id:'ROLE-DEMO-'+(demoRoles.length+1),version:0};
  Object.assign(record,{name,enabled:f.get('enabled')==='true',codes});if(r)record.version++;else demoRoles.push(record);
  audit('配置角色权限',record.id,reason,'已保存演示角色',{merchantId:'平台',before,after:`${name}；${record.enabled?'启用':'停用'}；${codes.join('、')}`});
 }else if(form.id==='access-operator-form'){
  const o=demoOperators.find(o=>o.id===form.dataset.id);if(!o||o.version!==Number(form.dataset.version))return fail('账号授权已变化，请重新读取。');
  const roles=f.getAll('roles'),scopeType=String(f.get('scopeType')),merchantIds=scopeType==='PLATFORM'?[]:f.getAll('merchants');
  if(roles.some(id=>!demoRoles.some(r=>r.id===id)))return fail('角色无效。');
  if(!['PLATFORM','MERCHANTS'].includes(scopeType)||merchantIds.some(id=>!merchantById(id))||(scopeType==='MERCHANTS'&&!merchantIds.length))return fail('请至少选择一个有效商户。');
  const summary=x=>`角色：${x.roles.join('、')||'无'}；范围：${x.scopeType==='PLATFORM'?'平台全部':x.merchantIds.join('、')}`,before=summary(o);
  Object.assign(o,{roles,scopeType,merchantIds});o.version++;
  audit('配置操作员授权',o.id,reason,'已保存；有效权限 '+effectiveCodes(roles,scopeType).length+' 项',{merchantId:'平台',before,after:summary(o)});
 }
 closeModal();render();notify('授权配置已保存到演示内存，可在操作审计查看');return true;
}
document.addEventListener('change',event=>{
 const input=event.target;
 if(input.id==='operator-scope'){$('#scope-merchants').disabled=input.value==='PLATFORM';return;}
 if(input.name!=='permissions')return;
 const form=input.closest('form'),boxes=[...form.querySelectorAll('[name=permissions]')];
 if(input.checked){const enable=code=>{permissionCatalog.find(p=>p[2]===code)[4].forEach(dep=>{boxes.find(b=>b.value===dep).checked=true;enable(dep);});};enable(input.value);}
 else{let changed=true;while(changed){changed=false;boxes.filter(b=>b.checked).forEach(b=>{const missing=permissionCatalog.find(p=>p[2]===b.value)[4].some(dep=>!boxes.find(x=>x.value===dep).checked);if(missing){b.checked=false;changed=true;}});}}
});
