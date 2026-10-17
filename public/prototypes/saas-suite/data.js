/* Shared business vocabulary for the HTML and editable Figma screens. */
window.OMS = {
  brand: '收单综合管理 SaaS平台', version: 'V1.1', date: '2026-10-17',
  channels: ['微信支付','支付宝','银联快捷'],
  groups: [
    ['总览', [['dashboard','工作台']]],
    ['商户准入', [['merchants','商户管理'],['merchantReview','商户审核'],['onboarding','支付渠道进件'],['integration','商户接口接入'],['lifecycle','商户后续维护']]],
    ['交易中心', [['orders','业务订单'],['payments','支付订单'],['flows','渠道流水'],['refunds','退款订单'],['transactions','交易查询']]],
    ['清结算中心', [['clearing','实时清分'],['accounts','渠道账务'],['statements','商户结算单'],['settlements','结算批次']]],
    ['对账中心', [['reconChannels','对账渠道参数'],['reconBatches','对账批次信息'],['differences','对账差错信息'],['feeRecon','分账与手续费对账']]],
    ['运行管理', [['reconTasks','对账任务'],['tasks','任务中心'],['exceptions','异常运营']]],
    ['风险管理', [['blacklist','黑名单信息管理']]],
    ['系统管理', [['channelConfig','支付渠道配置'],['merchantOperators','商户操作员'],['platformOperators','平台操作员'],['roles','角色管理'],['permissions','权限管理']]]
  ],
  merchantTabs: [
    ['基本信息', [
      ['name','商户名称','text',true],['entityName','商户主体名称','text',true],['entityType','主体类型','企业|个体工商户',true],['credit','统一社会信用代码','text',true],
      ['shortName','商户简称','text',true],['industry','经营类别','零售|餐饮|生活服务|教育服务|软件服务',true],['address','经营地址','text',true],['licenseStart','营业执照有效期开始','date',true],['licenseEnd','营业执照有效期结束','text',true]
    ]],
    ['门店信息', [['store','门店名称','text',true],['storeNo','门店编号','text',true],['storeAddress','门店地址','text',true],['hours','营业时间','text',true],['site','经营网站地址','url',false]]],
    ['商户联系人', [['contact','联系人姓名','text',true],['phone','联系人手机号','tel',true],['email','联系人邮箱','email',true],['legalName','法定代表人 / 经营者姓名','text',true],['legalId','负责人证件号码','text',true],['legalEnd','负责人证件有效期结束','text',true],['contactRole','联系人角色','法定代表人|经办人',true],['beneficiary','受益所有人姓名','text',false]]],
    ['协议信息', [['agreement','协议编号','text',true],['signedAt','签署日期','date',true],['agreementEnd','协议到期日','date',true],['signEntity','签约主体','text',true],['agreementNote','协议备注','text',false]]],
    ['银行结算信息', [['accountType','账户类型','对公账户|经营者个人账户',true],['bank','开户银行','工商银行|建设银行|招商银行|农业银行|中国银行|交通银行|其他银行',true],['branch','开户支行全称','text',true],['bankCode','联行号','text',true],['accountName','结算户名','text',true],['account','结算账号','text',true],['cycle','结算周期','D+1',true]]],
    ['对接信息', [['techName','技术联系人','text',true],['techPhone','技术联系电话','tel',true],['techEmail','技术邮箱','email',true],['callback','结果通知地址','url',false]]],
    ['附加信息', [['adminName','业务管理员姓名','text',true],['adminPhone','业务管理员手机号','tel',true],['remark','备注','text',false]]]
  ],
  seed: {
    merchants: [
      {id:'M1001',name:'青禾生活超市',entityName:'青禾生活商贸有限公司',entityType:'企业',credit:'TEST-CREDIT-1001',shortName:'青禾生活',industry:'零售',address:'测试市示范路 18 号',status:'已开通',review:'内部审核通过',version:'V2',fee:'2',sharing:true,tools:['微信支付','支付宝','银联快捷'],receiver:'平台服务费接收方',account:'6222 **** 1001'},
      {id:'M1002',name:'星湾书屋',entityName:'星湾文化有限公司',entityType:'企业',credit:'TEST-CREDIT-1002',shortName:'星湾书屋',industry:'零售',address:'测试市文化路 28 号',status:'已开通',review:'内部审核通过',version:'V1',fee:'3',sharing:true,tools:['微信支付','支付宝','银联快捷'],receiver:'平台服务费接收方',account:'6222 **** 1002'},
      {id:'M1003',name:'云朵咖啡馆',entityName:'云朵咖啡店',entityType:'个体工商户',credit:'TEST-CREDIT-1003',shortName:'云朵咖啡',industry:'餐饮',address:'测试市湖滨路 38 号',status:'已开通',review:'内部审核通过',version:'V1',fee:'4',sharing:true,tools:['微信支付','支付宝','银联快捷'],receiver:'平台服务费接收方',account:'6222 **** 1003'},
      {id:'M1004',name:'晴川生活服务',entityName:'晴川生活服务有限公司',entityType:'企业',credit:'TEST-CREDIT-1004',shortName:'晴川服务',industry:'生活服务',address:'测试市示范路 48 号',status:'待开通',review:'内部审核通过',version:'V1',fee:'2',sharing:true,tools:['微信支付','支付宝'],receiver:'平台服务费接收方',account:'6222 **** 1004'}
    ],
    reviews: [{id:'KYB1005',merchant:'湖畔商贸',merchantId:'M1005',kind:'新增',version:'V1',status:'待内部审核',submitter:'operator',submitted:'2026-10-17 09:10:00'}, {id:'CHG1001',merchant:'青禾生活超市',merchantId:'M1001',kind:'资料修改',version:'V3',status:'待内部审核',submitter:'operator',submitted:'2026-10-17 10:20:00',changed:'结算账号',oldValue:'6222 **** 1001',newValue:'6222 **** 9001'}],
    onboarding: ['青禾生活超市','星湾书屋','云朵咖啡馆'].flatMap((merchant,i)=>['微信支付','支付宝','银联快捷'].map((channel,j)=>({id:'AP'+(1001+i*3+j),merchant,merchantId:'M100'+(i+1),channel,status:'已通过',version:i===0?'V2':'V1',time:'2026-10-15 09:10:00',channelMerchant:'MOCK-'+(i+1)+'-'+(j+1)}))),
    orders: Array.from({length:15},(_,i)=>{const m=['青禾生活超市','星湾书屋','云朵咖啡馆'][i%3]; const status=['已支付','待支付','已退款','已支付','待支付'][i%5];return {id:'BO20261017'+String(i+1).padStart(4,'0'),merchant:m,merchantId:'M100'+(i%3+1),merchantOrder:'TEST-'+String(i+1).padStart(4,'0'),customer:'测试客户'+(i+1),channel:['微信支付','支付宝','银联快捷'][i%3],amount:[100,68,42.5,128,88][i%5],status,payment:'PO20261017'+String(i+1).padStart(4,'0'),created:'2026-10-17 10:'+String(i*3).padStart(2,'0')+':00',feeRate:2,channelRate:0.6,sharing:true,attempts:1}}),
    refunds: [{id:'RF202610170001',order:'BO202610170003',merchant:'云朵咖啡馆',channel:'银联快捷',amount:42.5,status:'已成功',feeReturn:true,reason:'客户申请全额退款',time:'2026-10-17 10:30:00'}, {id:'RF202610170002',order:'BO202610170009',merchant:'云朵咖啡馆',channel:'银联快捷',amount:128,status:'待补差',feeReturn:false,reason:'客户申请全额退款',time:'2026-10-17 11:00:00',gap:0.77}],
    sharing: [{id:'PS1001',order:'BO202610170001',merchant:'青禾生活超市',channel:'微信支付',amount:2,status:'已成功',receiver:'MOCK-WX-PLATFORM',time:'2026-10-17 10:00:02'}, {id:'PS1004',order:'BO202610170004',merchant:'青禾生活超市',channel:'微信支付',amount:2.56,status:'结果未知',receiver:'MOCK-WX-PLATFORM',time:'2026-10-17 10:09:02'}],
    batches: [{id:'ST20261017001',date:'2026-10-16',channel:'微信支付',count:3,amount:194.8,status:'已完成',time:'2026-10-17 02:00:00'}, {id:'ST20261017002',date:'2026-10-16',channel:'支付宝',count:2,amount:162.1,status:'处理中',time:'2026-10-17 02:00:10'}, {id:'ST20261017003',date:'2026-10-16',channel:'银联快捷',count:2,amount:0,status:'无应结金额',time:'2026-10-17 02:00:20'}],
    statements: [{id:'SS1001',batch:'ST20261017001',merchant:'青禾生活超市',channel:'微信支付',date:'2026-10-16',amount:194.8,version:'V1',status:'渠道结算成功',count:2}, {id:'SS1002',batch:'ST20261017001',merchant:'星湾书屋',channel:'微信支付',date:'2026-10-16',amount:0,version:'V1',status:'无应结金额',count:1}, {id:'SS1003',batch:'ST20261017002',merchant:'云朵咖啡馆',channel:'支付宝',date:'2026-10-16',amount:162.1,version:'V2',status:'待重新核验',count:2}],
    reconChannels: ['微信支付','支付宝','银联快捷'].map((channel,i)=>({id:['WECHAT_MOCK','ALIPAY_MOCK','UNIONPAY_QUICK_MOCK'][i],channel,platform:'MOCK-PLATFORM-'+(i+1),type:'支付与退款',protocol:'MOCK',source:'自动获取模拟账单',billTime:'01:00',suspense:1,windowStart:'00:00',windowEnd:'23:59',inService:'bill.fetch',inTransaction:'BILL_FETCH',reconService:'recon.run',reconTransaction:'RECON_RUN',status:'启用',clearing:'启用'})),
    reconBatches: [{id:'RC20261017001',channel:'微信支付',date:'2026-10-16',type:'支付',system:100,external:0,count:1,difference:1,status:'存在差错',first:'2026-10-17 01:05:00',file:'WX_20261016_PAYMENT.json',hash:'e0b542f9d18a5c30…'}, {id:'RC20261017002',channel:'支付宝',date:'2026-10-16',type:'支付',system:100,external:168,count:2,difference:1,status:'存在差错',first:'2026-10-17 01:05:10',file:'ALI_20261016_PAYMENT.json',hash:'2a67842d0585ab61…'}, {id:'RC20261017003',channel:'银联快捷',date:'2026-10-16',type:'退款',system:42.5,external:42.5,count:1,difference:0,status:'对平',first:'2026-10-17 01:05:20',file:'UP_20261016_REFUND.json',hash:'3f8977eac091fb64…'}],
    differences: [
      {id:'DF1001',batch:'RC20261017002',order:'BO202610170002',merchant:'星湾书屋',channel:'支付宝',type:'长款',business:'支付',system:0,external:68,status:'待核查',first:'2026-10-17 01:05:10',deadline:'—',eligible:true,history:[]},
      {id:'DF1002',batch:'RC20261017001',order:'BO202610170006',merchant:'云朵咖啡馆',channel:'微信支付',type:'存疑',business:'支付',system:100,external:0,status:'等待再次匹配',first:'2026-10-17 01:05:00',deadline:'2026-10-18 01:05:00',eligible:false,history:[]},
      {id:'DF1003',batch:'RC20261016001',order:'BO202610170007',merchant:'青禾生活超市',channel:'支付宝',type:'短款',business:'支付',system:68,external:0,status:'待核查',first:'2026-10-16 01:05:00',deadline:'2026-10-17 01:05:00',eligible:false,history:[]},
      {id:'DF1004',batch:'RC20261016002',order:'BO202610170009',merchant:'云朵咖啡馆',channel:'银联快捷',type:'金额不符',business:'支付',system:128,external:120,status:'待核查',first:'2026-10-16 01:06:00',deadline:'—',eligible:false,history:[]},
      {id:'DF1005',batch:'RC20261016003',order:'BO202610170010',merchant:'青禾生活超市',channel:'微信支付',type:'长款',business:'退款',system:0,external:88,status:'待人工核查',first:'2026-10-16 01:07:00',deadline:'—',eligible:false,history:[]}
    ],
    feeRecon: [{id:'FR1001',channel:'微信支付',date:'2026-10-16',type:'渠道手续费',expected:2.57,external:2.57,status:'对平'}, {id:'FR1002',channel:'支付宝',date:'2026-10-16',type:'平台服务费分账',expected:3.36,external:3.36,status:'对平'}, {id:'FR1003',channel:'银联快捷',date:'2026-10-16',type:'手续费返还',expected:0.26,external:0,status:'金额不符'}],
    tasks: [{id:'TK1001',type:'日切结算',source:'ST20261017002',status:'处理中',attempts:1,next:'2026-10-17 12:00:00'}, {id:'TK1002',type:'退款查单补偿',source:'RF202610170002',status:'等待资金',attempts:0,next:'等待来源恢复'}, {id:'TK1003',type:'对账获取与匹配',source:'RC20261017001',status:'已完成',attempts:1,next:'2026-10-18 01:00:00'}],
    exceptions: [{id:'EX1001',source:'RF202610170002',type:'退款待补差',merchant:'星湾书屋',level:'高',owner:'未分派',status:'待受理',note:''}, {id:'EX1002',source:'PS1004',type:'分账结果未知',merchant:'青禾生活超市',level:'中',owner:'finance',status:'处理中',note:'等待渠道查单确认'}],
    blacklist: [{id:'BL1001',type:'企业',name:'测试限制主体',identifier:'TEST-BL-001',business:'收单业务',reason:'风险核查',start:'2026-10-01',end:'2026-12-31',status:'启用'}],
    channelConfig: ['微信支付','支付宝','银联快捷'].map((channel,i)=>({id:['WECHAT_MOCK','ALIPAY_MOCK','UNIONPAY_QUICK_MOCK'][i],channel,fee:0.6,receiver:'MOCK-'+['WX','ALI','UP'][i]+'-PLATFORM',receiverName:'平台服务费接收方',status:'启用',version:'V1'})),
    operators: [{id:'OP1001',account:'merchant_qh',name:'青禾商户操作员',merchant:'青禾生活超市',role:'商户操作员',status:'启用'}, {id:'OP1002',account:'merchant_xw',name:'星湾商户操作员',merchant:'星湾书屋',role:'商户操作员',status:'启用'}],
    staff: [{id:'U1001',account:'admin',name:'平台管理员',role:'管理员',status:'启用'}, {id:'U1002',account:'operator',name:'运营专员',role:'运营',status:'启用'}, {id:'U1003',account:'reviewer',name:'审核专员',role:'审核员',status:'启用'}, {id:'U1004',account:'finance',name:'财务专员',role:'财务',status:'启用'}],
    roles: [{id:'ADMIN',role:'管理员',count:1,scope:'配置、人员、查询与指定财务处理',status:'启用'}, {id:'OPERATIONS',role:'运营',count:1,scope:'商户资料、进件、交易发起',status:'启用'}, {id:'REVIEWER',role:'审核员',count:1,scope:'独立商户审核，不发起交易',status:'启用'}, {id:'FINANCE',role:'财务',count:1,scope:'结算、对账、核查复核',status:'启用'}],
    integration: [{id:'APP1001',merchant:'青禾生活超市',appId:'MOCK_APP_QH',signature:'HMAC-SHA256',callback:'https://example.invalid/notify',status:'启用',notification:'仅记录，不发送真实网络请求'}],
    lifecycle: [{id:'LC1001',merchant:'青禾生活超市',channel:'微信支付',type:'结算账号变更',platform:'6222 **** 9001 · V3',effective:'6222 **** 1001 · V2',status:'渠道处理中',time:'2026-10-17 10:25:00'}],
    audit: Array.from({length:14},(_,i)=>({id:'AU'+String(i+1).padStart(4,'0'),operator:'admin',action:i%2?'接收方配置':'渠道费率配置',target:['微信支付','支付宝','银联快捷'][i%3],before:'V'+(i+1),after:'V'+(i+2),reason:'测试参数维护',time:'2026-10-17 09:'+String(i*2).padStart(2,'0')+':00'}))
  }
};
for(const m of window.OMS.seed.merchants){
  const defaults={licenseStart:'2020-01-01',licenseEnd:'长期',store:m.name+'示范店',storeNo:'STORE-'+m.id,storeAddress:m.address,hours:'09:00-21:00',contact:'测试业务联系人',phone:'13800000001',email:'contact@example.invalid',legalName:'测试负责人',legalId:'TEST-ID-'+m.id,legalEnd:'长期',contactRole:'法定代表人',agreement:'AG-'+m.id,signedAt:'2026-10-01',agreementEnd:'2027-10-01',signEntity:m.entityName,accountType:m.entityType==='企业'?'对公账户':'经营者个人账户',bank:'招商银行',branch:'测试银行示范支行',bankCode:'MOCK-BANK-'+m.id,accountName:m.entityName,cycle:'D+1',techName:'测试技术联系人',techPhone:'13800000001',techEmail:'tech@example.invalid',adminName:'测试业务管理员',adminPhone:'13800000001',files:{file0:'测试营业执照.pdf',file1:'测试负责人正面.pdf',file2:'测试负责人反面.pdf',file3:'测试结算账户.pdf'}};
  for(const [key,value]of Object.entries(defaults))if(m[key]===undefined)m[key]=value;
  for(const channel of m.tools)m['receiver_'+channel]=window.OMS.seed.channelConfig.find(c=>c.channel===channel).receiver;
}
