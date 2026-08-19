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
    order: 2,
    title: "电子券营销平台",
    eyebrow: "营销活动 × 发券 × 核销",
    summary: "源于省内运营活动的电子券经验，围绕活动、发券、券生命周期、商户核销与运营统计，脱敏重构一套可解释、可验证的业务闭环。",
    problem: "营销活动依赖多角色协作，规则分散后容易出现超发、重复发券、重复核销和商户数据越权等问题。",
    role: "以 B 端产品经理、项目负责人和开发者三种视角完成范围规划、规则设计、原型、接口、数据模型与代码落地。",
    constraints: ["首期只验证核心闭环", "不接入真实支付和短信", "保留传统 JSP 技术栈的可交付性"],
    decisions: [
      { title: "先闭环，再扩展", detail: "首期聚焦活动创建、发券、核销和统计，不提前建设清结算与复杂权限。" },
      { title: "活动与券分开建模", detail: "活动决定预算和规则，券记录个人生命周期，避免状态含义混杂。" },
      { title: "异常规则前置", detail: "用唯一约束、条件更新与请求号幂等控制重复发券和重复核销。" },
    ],
    outcome: ["将复杂活动流程沉淀为可复用的后台产品能力", "通过“运营 + 商户池”协同机制，使营销活动效率提升约 50%", "建立完整 PRD、原型、接口与状态机文档"],
    reflection: "下一步会补充真实运营指标口径和活动效果归因，但不会在核心规则尚未稳定时扩张功能。",
    tags: ["0→1 规划", "状态机", "幂等", "Spring Boot"],
    portfolio: [
      { title: "活动、券与核销的业务闭环", detail: "将活动预算、券生命周期、商户核销和运营统计组织为一条可演示的主链路。" },
      { title: "规则与异常设计", detail: "以状态机、唯一约束、条件更新和请求号幂等，前置控制超发与重复核销。" },
      { title: "产品到工程的交付物", detail: "已沉淀 PRD、页面原型、接口、数据模型、演示走查与工程交付说明。" },
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
    order: 3,
    title: "国寿嘉园支付管理系统",
    eyebrow: "支付 × 退款 × 对账",
    summary: "面向养老服务场景，梳理商户收款、交易、退款、通知补偿、对账差错和审计追踪的后台管理闭环。",
    problem: "多种收款渠道和多个业务系统并存，支付结果、退款状态、通知重试与对账差错需要统一管理。",
    role: "负责一期范围、业务流程、PRD、接口契约、验收标准和传统 Java Web 工程落地。",
    constraints: ["不对接真实支付机构", "一期聚焦商户门户", "不扩张为完整 BOSS 后台"],
    decisions: [
      { title: "按风险顺序推进", detail: "先交易，再退款、通知补偿、对账和审计，逐步建立可追踪闭环。" },
      { title: "保留补偿机制", detail: "将通知失败作为可查询、可重试的业务状态，而不是隐藏的技术异常。" },
      { title: "审计成为基础能力", detail: "登录、退款、补偿和差错查看均保留操作记录。" },
    ],
    outcome: ["形成商户门户一期完整演示", "沉淀支付异常与对账处理规则", "完成 Spring MVC + JSP + MySQL 实现"],
    reflection: "生产级版本需要继续补充机构参数、风控、真实对账文件解析与更细权限。",
    tags: ["支付闭环", "通知补偿", "对账", "审计"],
    portfolio: [
      { title: "交易到对账的支付闭环", detail: "覆盖商户收款、退款、通知补偿、对账差错和审计追踪等核心后台流程。" },
      { title: "可追踪的异常处理", detail: "将通知失败作为可查询、可重试的业务状态，而非不可见的技术异常。" },
      { title: "一期交付边界", detail: "输出业务流程、PRD、接口契约、验收标准与商户门户原型，明确真实机构接入边界。" },
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
    slug: "home-information-management-system",
    order: 5,
    title: "房产用户信息管理系统",
    eyebrow: "Excel 替代 × 档案工作台",
    summary: "把房号、购房人、资料文件和业务节点从分散 Excel 与文件夹中抽离，建立可追踪的本地业务工作台。",
    problem: "资料散落在表格和文件夹中，房号、购房人、协议与流程节点难以形成统一档案和待办视图。",
    role: "完成需求分析、产品建模、MVP 取舍、Figma 原型以及 React + FastAPI 工程实现。",
    constraints: ["数据只保存在本地", "不做财务系统", "首版不做云同步和复杂多权限"],
    decisions: [
      { title: "房号作为主对象", detail: "购房人、协议、资料和流程节点围绕房号档案组织，减少重复录入。" },
      { title: "状态由系统计算", detail: "基于关键节点形成进度与待办，避免人工维护多个冲突状态。" },
      { title: "先解决现场痛点", detail: "优先完成检索、资料归档、流程追踪和本地备份。" },
    ],
    outcome: ["建立房号档案与资料管理闭环", "形成可重置的演示数据", "完成 React + FastAPI + SQLite 本地应用"],
    reflection: "后续可通过角色权限、批量导入与 OCR 提高规模化效率，但首版不应牺牲简单可靠。",
    tags: ["需求分析", "MVP", "信息模型", "React"],
    portfolio: [
      { title: "房号档案与资料归集", detail: "以房号为主对象，关联购房人、协议、资料及流程节点，减少分散记录。" },
      { title: "状态与待办工作台", detail: "由关键节点计算业务进度和待办，让当前状态可查询、可追踪。" },
      { title: "本地优先 MVP", detail: "覆盖需求分析、信息模型、Figma 原型与本地可运行应用，暂不扩张云同步和复杂权限。" },
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
    order: 1,
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
