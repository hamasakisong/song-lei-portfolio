export type EvidenceLink = {
  label: string;
  href: string;
  kind: "source" | "figma" | "document";
};

export type PortfolioItem = {
  title: string;
  detail: string;
};

export type ProjectRecord = {
  slug: string;
  order: number;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  role: string;
  constraints: string[];
  decisions: Array<{ title: string; detail: string }>;
  outcome: string[];
  reflection: string;
  tags: string[];
  portfolio: PortfolioItem[];
  evidence: EvidenceLink[];
  media: Array<{ src: string; alt: string; caption: string }>;
  variant: "case" | "experience";
};

const projectRecords: ProjectRecord[] = [
  {
    slug: "payment",
    order: 1,
    title: "电子券营销平台",
    eyebrow: "省分营销 × 电子券全生命周期",
    summary: "围绕省分营销活动运营效率提升，建设覆盖活动创建、规则配置、电子券发放、消费核销、资金结算与数据统计的电子券全生命周期管理平台。",
    problem: "各省分持续开展营销活动，但活动创建、商户和商品范围配置、电子券发放、核销及后续结算相对分散，运营人员需要大量人工维护；同时各省分规则存在差异，缺少一套既能统一管理又能适配差异化场景的平台能力。",
    role: "担任产品经理和项目负责人，负责从业务调研、需求分析、产品设计，到研发测试协同、上线推进及后续运营优化的全流程工作。",
    constraints: ["兼顾集团统一管理与省分差异化规则", "覆盖营销、交易确认与资金结算完整链路", "通过配置化降低运营对研发的依赖"],
    decisions: [
      { title: "活动配置体系设计", detail: "将不同省分的活动规则拆分为基础信息、优惠规则、适用范围、有效期和审核流程等可配置模块，使省分复用核心能力并按自身规则完成配置。" },
      { title: "商户组批量配置", detail: "针对大量适用商户需要逐个选择的低效流程，抽象商户关系并设计可复用的商户组；活动配置时选择商户组即可完成批量关联。" },
      { title: "审核流程设计", detail: "考虑营销活动涉及资金补贴和业务影响，将活动创建、审核、发布拆分为明确流程，避免未经确认的活动直接上线。" },
    ],
    outcome: ["形成从活动创建、规则配置、电子券发放、消费核销到资金结算和数据统计的统一闭环", "通过商户组批量配置减少重复维护，运营效率提升约 50%", "完成从业务需求分析、产品方案设计、研发协作到上线运营优化的全流程推进"],
    reflection: "项目的难点不在电子券发放本身，而在于把营销活动与后续交易、结算流程连接起来，在用户体验、商户权益和资金安全之间取得平衡。",
    tags: ["营销活动", "需求分析", "配置化设计", "清结算"],
    portfolio: [
      { title: "从活动创建到资金结算的闭环", detail: "梳理活动创建、规则配置、商户与商品关联、发券、核销、交易确认、资金结算及数据统计等核心流程。" },
      { title: "活动配置体系设计", detail: "以基础信息、优惠规则、适用范围、有效期和审核流程等模块承接通用能力与省分差异化规则。" },
      { title: "商户组与审核机制", detail: "通过商户组完成批量关联，并以创建、审核、发布流程控制营销活动上线风险。" },
    ],
    evidence: [
      { label: "查看 Figma 原型", href: "https://www.figma.com/design/tKmJNmf4myINOLQ4BKAoKy/%E7%94%B5%E5%AD%90%E5%88%B8%E7%B3%BB%E7%BB%9F%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E8%A7%86%E8%A7%89%E4%BC%98%E5%8C%96%E5%8E%9F%E5%9E%8B?t=j6DcBBKS1q7Acnc4-0", kind: "figma" },
      { label: "体验交互原型", href: "/prototypes/coupon-admin/", kind: "document" },
    ],
    media: [],
    variant: "case",
  },
  {
    slug: "lifecaregarden",
    order: 2,
    title: "国寿嘉园支付管理系统",
    eyebrow: "养老社区 × 统一支付平台",
    summary: "面向中国人寿养老社区业务建设统一支付管理平台，整合支付宝、微信和银行快捷支付等渠道，提升用户支付体验与订单转化效率。",
    problem: "原有支付方式较为单一，难以覆盖不同用户的支付习惯；用户可能因没有合适支付方式或支付失败在支付环节流失，影响订单转化。同时需要在后台形成商户、交易、支付与通道对账的一体化管理能力。",
    role: "担任产品经理和项目负责人，参与前期业务梳理、需求分析、产品方案设计、研发协同、测试上线及上线后持续优化；负责多支付渠道统一接入、商户管理、交易管理、支付管理和通道对账等核心模块设计，并推进需求评审与项目进度。",
    constraints: ["兼顾多支付渠道的统一接入与差异化适配", "让业务系统只对接统一支付接口", "在需求决策链路不清晰时保障项目持续推进"],
    decisions: [
      { title: "统一支付能力", detail: "对业务系统提供统一支付入口；内部通过渠道适配接入支付宝、微信和银行快捷支付，统一订单创建、支付状态、回调处理与异常处理。" },
      { title: "商户管理模块", detail: "设计商户信息维护和支付能力配置，使不同业务主体可以按实际需求配置可用支付方式。" },
      { title: "交易管理", detail: "围绕订单状态管理、支付结果查询和异常交易处理设计后台能力，帮助业务人员快速定位支付问题。" },
      { title: "通道对账", detail: "通过渠道交易数据与平台订单数据匹配，处理不同支付渠道间的交易状态和账务差异，保障支付数据准确。" },
      { title: "以方案驱动需求确认", detail: "面对客户侧业务负责人和决策链路不清晰的问题，先基于已有资料形成业务流程、产品方案和待确认问题清单，再组织需求确认会逐项讨论；未决事项持续跟踪，避免阻塞整体进度。" },
    ],
    outcome: ["形成覆盖商户、交易、支付与通道对账的统一支付管理体系", "订单转化率相比单一支付方式提升约 20%", "通过增加支付方式并优化支付流程，降低用户支付阻碍并提升订单完成效率"],
    reflection: "统一支付平台的价值不仅是增加支付方式，更在于用统一接口屏蔽渠道差异，并通过交易管理与通道对账保障支付链路的可追踪性和数据准确性。",
    tags: ["统一支付", "多渠道接入", "交易管理", "通道对账"],
    portfolio: [
      { title: "统一支付接入与渠道适配", detail: "业务系统通过统一接口发起支付，平台根据支付方式组装渠道请求、解析返回结果并转换为统一支付状态。" },
      { title: "商户、交易与通道对账管理", detail: "覆盖商户支付能力配置、订单与异常交易查询，以及渠道交易数据与平台订单的匹配核对。" },
      { title: "方案驱动的需求推进", detail: "以流程和方案为讨论基础，将待确认问题显性化并持续跟踪，在需求决策链路不清晰时保持项目节奏。" },
    ],
    evidence: [
      { label: "查看 GitHub 工程", href: "https://github.com/hamasakisong/lifecaregarden", kind: "source" },
      { label: "查看 Figma 原型", href: "https://www.figma.com/design/xNee5bHUV5PO4znAZLTHee/%E5%9B%BD%E5%AF%BF%E5%98%89%E5%9B%AD%E6%94%AF%E4%BB%98%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F-%E5%AE%8C%E6%95%B4%E6%94%AF%E4%BB%98%E9%97%AD%E7%8E%AF%E5%8E%9F%E5%9E%8B?node-id=3-2&t=j6DcBBKS1q7Acnc4-0", kind: "figma" },
      { label: "查看 FigJam 架构图", href: "https://www.figma.com/board/XW7X2kpoW5wABVaYDnt0bi/%E5%9B%BD%E5%AF%BF%E5%98%89%E5%9B%AD%E6%94%AF%E4%BB%98%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%E5%9B%BE?node-id=0-1&p=f&t=j6DcBBKS1q7Acnc4-0", kind: "document" },
      { label: "体验交互原型", href: "/prototypes/lifecaregarden-payment/", kind: "document" },
    ],
    media: [],
    variant: "case",
  },
  {
    slug: "aggregate-payment",
    order: 3,
    title: "沃支付聚合支付平台",
    eyebrow: "省分业务 × 统一支付 × 对账平台",
    summary: "面向省分业务和内部系统建设的聚合支付能力平台，为业务系统提供统一支付接口，并通过渠道接入与对账平台支撑多渠道交易管理。",
    problem: "不同支付渠道的接口与业务规则存在差异，业务系统若分别直接对接多个渠道，容易形成较高的接入与维护成本；随着渠道增加，渠道账单和平台交易数据还可能因网络异常、跨日交易和渠道处理差异产生不一致，需要统一的支付能力与对账管理机制。",
    role: "担任产品经理，负责支付业务流程梳理、需求分析和产品设计，完成统一支付、渠道接入和对账平台等核心能力规划，并推进 PRD、交互原型及工程验证落地。",
    constraints: ["向省分业务和内部系统提供标准化支付接口", "通过渠道适配层屏蔽各支付渠道的交易与接口差异", "将渠道账单、平台交易流水和匹配规则纳入统一对账管理"],
    decisions: [
      { title: "统一支付模块", detail: "对外提供标准化支付接口；对内通过渠道适配层完成参数转换、接口调用和支付状态映射，使业务系统无需分别关注各渠道的具体差异。" },
      { title: "渠道接入", detail: "针对不同渠道的交易流程、参数定义、返回状态和异常处理方式，设计渠道适配层，将渠道能力转换为平台统一的交易模型。" },
      { title: "对账平台", detail: "独立设计对账平台，对渠道账单、平台交易流水和匹配规则进行统一管理，支持识别网络异常、跨日交易和渠道处理差异带来的数据不一致。" },
    ],
    outcome: ["形成面向省分业务和内部系统的统一支付能力规划，降低多渠道直接接入的复杂度", "完成统一支付、渠道接入、交易查询与对账差异等核心流程的产品设计和交互展示", "建立渠道账单、平台交易流水和匹配规则的统一对账视图，支撑交易数据核对与差异处理"],
    reflection: "聚合支付的重点不只是把多个支付方式汇集到一个入口，而是通过统一支付接口、渠道适配和对账机制，把渠道差异、交易状态和账务数据纳入可管理的业务闭环。",
    tags: ["聚合支付", "统一支付", "渠道接入", "对账平台"],
    portfolio: [
      { title: "统一支付模块", detail: "业务系统通过标准化接口发起支付，平台完成参数转换、渠道调用和支付状态映射，屏蔽渠道差异。" },
      { title: "渠道接入与统一交易模型", detail: "将不同渠道的交易流程、参数、返回状态和异常处理方式抽象为统一交易模型，并由渠道适配层承接差异。" },
      { title: "渠道账单与交易流水对账", detail: "以渠道账单、平台交易流水和匹配规则为核心，呈现对账差异并支持后续核对处理。" },
    ],
    evidence: [
      { label: "体验交互原型", href: "/prototypes/aggregate-payment/", kind: "document" },
    ],
    media: [
      { src: "/projects/aggregate-payment/prototype-preview.png", alt: "沃支付聚合支付平台收银台原型", caption: "原型覆盖多渠道收银台，并可继续体验交易、对账差异、统计和商户查询。" },
    ],
    variant: "case",
  },
  {
    slug: "home-information-management-system",
    order: 5,
    title: "房产用户信息管理系统",
    eyebrow: "房号档案 × 节点化流程",
    summary: "面向房地产销售业务的信息管理系统：以房号档案为核心，关联购房人、购房协议、资料、付款与网签、交付、房产证领取等流程节点，支持跨岗位协同。",
    problem: "从选房、购房协议签订到资料收集、网签办理和房产证领取，业务周期长且涉及多个岗位。原有信息分散在纸质资料、Excel 和文件夹中，查询、资料管理和进度跟踪效率较低，业务衔接依赖人工沟通。",
    role: "参与跨部门调研和业务流程梳理，完成核心对象建模、流程与状态设计、角色协同和关键业务规则设计，将线下售房办理过程转化为可落地的产品方案。",
    constraints: ["以房号档案串联购房人、购房协议、资料与流程节点", "覆盖销售、财务、业务办理与交付等跨岗位协同", "通过状态流转和角色确认控制关键业务节点"],
    decisions: [
      { title: "房号档案作为核心对象", detail: "以房号而非购房人为主线，归集楼栋、单元、户型与销售状态，并关联购房人、购房协议、身份资料和补充材料；一套房多人购房通过关系模型承接。" },
      { title: "节点化流程与状态控制", detail: "将认购、首付款确认、签约、工程节点、尾款支付、网签、交付通知与房产证领取转化为有责任人和状态的办理节点，使进度和后续待办可直接查询。" },
      { title: "多人购房与受控回退", detail: "对多人购房、修改和取消等特殊场景建模：涉及款项的节点须经财务确认后才能流转；网签前后适用不同处理规则；取消业务后重置房号销售状态而非删除房源档案。" },
    ],
    outcome: ["将房号、购房人、购房协议和业务资料纳入统一信息化管理", "通过房号状态直接呈现付款、网签、交付等办理进度", "将依赖人工沟通的跨岗位协作过程纳入系统管理"],
    reflection: "项目的价值不只是把线下表格搬到系统里，而是先识别房号、购房人、协议、资料与流程节点之间的关系，再以状态、角色和业务规则承载真实的协作过程。研发背景也让我能同时判断业务方案与系统实现的可行性。",
    tags: ["业务调研", "需求分析", "对象建模", "流程设计"],
    portfolio: [
      { title: "房号档案与购房资料归集", detail: "以房号档案关联购房人、购房协议、身份资料和补充材料，并保留楼栋、单元、户型与销售状态等基础信息。" },
      { title: "从认购到房产证领取的流程管理", detail: "将认购、付款、签约、网签、交付及房产证领取组织为可追踪的节点流程，明确状态与责任人。" },
      { title: "状态、角色与业务规则", detail: "以财务确认驱动款项节点流转，并对多人购房、网签前后修改和取消业务建立受控规则。" },
    ],
    evidence: [
      { label: "查看 Figma 原型", href: "https://www.figma.com/proto/fII6jlGpr8Ox97K3xYZII0/%E6%88%BF%E4%BA%A7%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F---MVP-%E5%8E%9F%E5%9E%8B?node-id=0-1", kind: "figma" },
      { label: "体验交互原型", href: "/prototypes/home-information-management/", kind: "document" },
    ],
    media: [],
    variant: "case",
  },
  {
    slug: "jpnms",
    order: 4,
    title: "日本商户管理系统",
    eyebrow: "商户 × 交易 × 清结算",
    summary: "围绕商户准入、交易对账、结算和运营看板，规划复杂 B 端系统的模块边界、业务对象和迭代路线。",
    problem: "商户、交易、渠道、对账与结算相互关联，缺少统一模型时容易造成状态断裂和职责边界模糊。",
    role: "负责业务资料梳理、产品设计、路线规划、风险登记、接口定义与前后端实现验证。",
    constraints: ["全部使用虚构演示数据", "首期不处理真实卡组织文件", "按里程碑逐步交付"],
    decisions: [
      { title: "先统一业务语言", detail: "通过术语表和系统上下文统一商户、交易、对账与结算定义。" },
      { title: "按业务闭环拆里程碑", detail: "从基础与交易开始，再进入对账、结算、看板和商户准入。" },
      { title: "建立可追溯关系", detail: "需求、原型、接口、验收和实现均保留映射。" },
    ],
    outcome: ["形成完整 PRD、路线图和风险登记", "完成核心前后端模块", "沉淀多套面试讲解与演示材料"],
    reflection: "复杂系统首先需要稳定边界和词汇，再追求模块数量；否则新增功能只会扩大不一致。",
    tags: ["复杂系统", "清结算", "路线图", "React"],
    portfolio: [
      { title: "商户、交易与清结算模型", detail: "围绕商户准入、交易、对账和结算建立统一业务对象与模块边界。" },
      { title: "两条可点击业务流程", detail: "原型聚焦商户入网与交易清算对账，呈现状态、角色和异常处理。" },
      { title: "从需求到验证的追溯", detail: "将 PRD、原型页面、接口、核心实体、验收场景和里程碑保持映射。" },
    ],
    evidence: [
      { label: "查看 GitHub 工程", href: "https://github.com/hamasakisong/jpn-ms", kind: "source" },
      { label: "查看 Figma 原型", href: "https://www.figma.com/design/xXhvG3OJnweeuJGMdhbE2E/%E6%97%A5%E6%9C%ACMS%E6%94%B6%E5%8D%95%E4%B8%9A%E5%8A%A1%E7%AE%A1%E7%90%86%E4%B8%8E%E6%B8%85%E7%BB%93%E7%AE%97%E7%B3%BB%E7%BB%9F%EF%BD%9C%E4%BA%A7%E5%93%81%E5%8E%9F%E5%9E%8B?t=j6DcBBKS1q7Acnc4-0", kind: "figma" },
      { label: "体验交互原型", href: "/prototypes/jpnms-settlement/", kind: "document" },
    ],
    media: [
      { src: "/projects/jpnms/dashboard.png", alt: "日本商户管理系统运营看板", caption: "运营看板用于汇总交易、商户与对账状态。" },
      { src: "/projects/jpnms/reconciliation-detail.png", alt: "日本商户管理系统对账差错详情", caption: "对账详情强调差错来源、处理状态与可追踪性。" },
    ],
    variant: "case",
  },
  {
    slug: "saas-experience",
    order: 6,
    title: "SaaS 信息管理系统 Suite",
    eyebrow: "用户 × 订单 × 财务 × 资金链路",
    summary: "基于金融支付项目经验沉淀的企业级 SaaS 后台作品，覆盖用户、订单、财务三套平台与支付交易资金链路。",
    problem: "订单、支付、退款、对账、清分清算、结算与财务入账相互关联；若缺少统一的业务与资金模型，数据、状态和职责边界会持续失控。",
    role: "以产品经理、项目管理与研发协同的复合视角，完成从项目规划、PRD、原型到数据、权限、接口与系统设计的 0→1 设计基线。",
    constraints: ["不披露真实业务与客户数据", "定位为落地前的产品与系统设计，不声称已上线", "以资金闭环和可追溯性控制范围"],
    decisions: [
      { title: "先统一资金闭环", detail: "先厘清订单、支付、退款、对账、清分清算、结算和财务入账的对象、状态与关系，再展开各平台页面。" },
      { title: "按平台拆分职责", detail: "用户管理、订单管理与财务管理分别服务不同业务角色，同时通过统一数据与权限规则保持可追溯。" },
      { title: "以设计基线支持落地", detail: "用规划、PRD、原型、数据字典、权限矩阵、接口清单和详细设计，让后续研发与验收有共同依据。" },
    ],
    outcome: ["形成用户、订单、财务三套平台与支付资金链路的系统化规划", "沉淀项目规划、PRD、功能设计、详细设计与面试作品集演示稿", "形成可在 5—8 分钟内讲清业务闭环、角色与价值的展示主线"],
    reflection: "这套作品聚焦 0→1 落地前的规划和设计能力；后续只有经过真实项目验证的规则与方法，才会进入长期经验框架。",
    tags: ["企业级 SaaS", "支付资金链路", "项目规划", "产品设计"],
    portfolio: [
      { title: "用户、订单与财务三套平台", detail: "围绕不同角色拆分平台职责，并以统一的数据、权限与审计规则连接业务闭环。" },
      { title: "支付交易资金链路", detail: "完整梳理支付、退款、对账、差错、清分清算、结算与财务入账的状态和资金关系。" },
      { title: "0→1 产品与系统设计基线", detail: "已形成项目规划、PRD、功能设计、详细设计、演示稿与答辩材料，支持后续研发协同和验收。" },
    ],
    evidence: [
      { label: "查看 Figma 原型", href: "https://www.figma.com/design/AqUI9s9AZwMVgKuIHD0lgH/SaaS%E7%BB%BC%E5%90%88%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F-Suite-%E5%85%A5%E5%8F%A3?node-id=0-1&p=f&t=j6DcBBKS1q7Acnc4-0", kind: "figma" },
      { label: "体验交互原型", href: "/prototypes/saas-suite/", kind: "document" },
    ],
    media: [],
    variant: "experience",
  },
];

export const projects = [...projectRecords].sort((left, right) => left.order - right.order);

export const caseProjects = projects.filter((project) => project.variant === "case");
export const experienceProject = projects.find((project) => project.variant === "experience")!;
export const findProject = (slug: string) => caseProjects.find((project) => project.slug === slug);
