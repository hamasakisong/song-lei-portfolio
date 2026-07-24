export type EvidenceLink = {
  label: string;
  href: string;
  kind: "source" | "figma" | "document";
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
  evidence: EvidenceLink[];
  media: Array<{ src: string; alt: string; caption: string }>;
  variant: "case" | "experience";
};

export const projects: ProjectRecord[] = [
  {
    slug: "payment",
    order: 1,
    title: "电子券营销平台",
    eyebrow: "营销活动 × 发券 × 核销",
    summary: "围绕活动、发券、券生命周期、商户核销与运营统计，脱敏重构一套可解释、可验证的电子券业务闭环。",
    problem: "营销活动依赖多角色协作，规则分散后容易出现超发、重复发券、重复核销和商户数据越权等问题。",
    role: "以 B 端产品经理、项目负责人和开发者三种视角完成范围规划、规则设计、原型、接口、数据模型与代码落地。",
    constraints: ["首期只验证核心闭环", "不接入真实支付和短信", "保留传统 JSP 技术栈的可交付性"],
    decisions: [
      { title: "先闭环，再扩展", detail: "首期聚焦活动创建、发券、核销和统计，不提前建设清结算与复杂权限。" },
      { title: "活动与券分开建模", detail: "活动决定预算和规则，券记录个人生命周期，避免状态含义混杂。" },
      { title: "异常规则前置", detail: "用唯一约束、条件更新与请求号幂等控制重复发券和重复核销。" },
    ],
    outcome: ["形成可演示的 5 分钟主链路", "建立完整 PRD、原型、接口与状态机文档", "完成 JSP + Spring Boot + MySQL 工程实现"],
    reflection: "下一步会补充真实运营指标口径和活动效果归因，但不会在核心规则尚未稳定时扩张功能。",
    tags: ["0→1 规划", "状态机", "幂等", "Spring Boot"],
    evidence: [],
    media: [],
    variant: "case",
  },
  {
    slug: "lifecaregarden",
    order: 2,
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
    evidence: [],
    media: [],
    variant: "case",
  },
  {
    slug: "home-information-management-system",
    order: 3,
    title: "房产用户信息管理系统",
    eyebrow: "Excel 替代 × 档案工作台",
    summary: "把房号、购房人、资料文件和业务节点从分散 Excel 与文件夹中抽离，建立可追踪的本地业务工作台。",
    problem: "资料散落在表格和文件夹中，房号、购房人、合同与办理节点难以形成统一档案和待办视图。",
    role: "完成需求分析、产品建模、MVP 取舍、Figma 原型以及 React + FastAPI 工程实现。",
    constraints: ["数据只保存在本地", "不做财务系统", "首版不做云同步和复杂多权限"],
    decisions: [
      { title: "房号作为主对象", detail: "购房人、资料和办理节点围绕房号档案组织，减少重复录入。" },
      { title: "状态由系统计算", detail: "基于关键节点形成进度与待办，避免人工维护多个冲突状态。" },
      { title: "先解决现场痛点", detail: "优先完成检索、资料归档、流程追踪和本地备份。" },
    ],
    outcome: ["建立房号档案与资料管理闭环", "形成可重置的演示数据", "完成 React + FastAPI + SQLite 本地应用"],
    reflection: "后续可通过角色权限、批量导入与 OCR 提高规模化效率，但首版不应牺牲简单可靠。",
    tags: ["需求分析", "MVP", "信息模型", "React"],
    evidence: [],
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
    evidence: [],
    media: [
      { src: "/projects/jpnms/dashboard.png", alt: "日本商户管理系统运营看板", caption: "运营看板用于汇总交易、商户与对账状态。" },
      { src: "/projects/jpnms/reconciliation-detail.png", alt: "日本商户管理系统对账差错详情", caption: "对账详情强调差错来源、处理状态与可追踪性。" },
    ],
    variant: "case",
  },
  {
    slug: "saas-experience",
    order: 5,
    title: "SaaS 与支付经验沉淀",
    eyebrow: "方法 × 判断 × 复盘",
    summary: "把多年支付与 SaaS 项目中的资金链路、功能规划、项目推进和风险判断，整理为可复用的方法体系。",
    problem: "单个项目只能呈现一个结果，难以说明长期经验如何形成稳定的产品判断与项目方法。",
    role: "将过往真实业务经验脱敏整理为规划文档、PRD、资金链路、功能设计和答辩材料。",
    constraints: ["不披露公司机密", "不把经验包装成虚构上线项目", "强调方法的适用边界"],
    decisions: [
      { title: "从文档转向判断", detail: "不展示文档数量，重点解释为什么这样划分范围、模块与资金链路。" },
      { title: "用证据支持方法", detail: "通过规划、PRD、功能设计和支付链路说明判断如何落地。" },
      { title: "保留反例和边界", detail: "方法不是万能模板，需要说明适用场景、风险和取舍。" },
    ],
    outcome: ["形成系统化面试作品集材料", "整理可复用的支付链路和规划框架", "沉淀高频追问与答辩思路"],
    reflection: "经验专题会持续更新，但只有经过项目验证的方法才进入主框架。",
    tags: ["经验沉淀", "支付链路", "项目规划", "产品判断"],
    evidence: [],
    media: [],
    variant: "experience",
  },
];

export const caseProjects = projects.filter((project) => project.variant === "case");
export const experienceProject = projects.find((project) => project.variant === "experience")!;
export const findProject = (slug: string) => caseProjects.find((project) => project.slug === slug);
