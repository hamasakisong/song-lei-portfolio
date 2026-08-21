import { projects } from "./projects";

it("keeps the approved project order", () => {
  expect(projects.map((project) => project.slug)).toEqual([
    "payment",
    "lifecaregarden",
    "aggregate-payment",
    "home-information-management-system",
    "jpnms",
    "saas-experience",
  ]);
});

it("captures the aggregate-payment platform's unified transaction lifecycle", () => {
  const project = projects.find((item) => item.slug === "aggregate-payment");

  expect(project?.summary).toContain("聚合支付");
  expect(project?.decisions.map((item) => item.title)).toEqual(expect.arrayContaining([
    "统一支付模块",
    "动态收银与渠道接入",
    "交易售后与数据权限",
    "对账平台",
  ]));
  expect(project?.evidence).toEqual(expect.arrayContaining([
    expect.objectContaining({ href: "https://www.figma.com/design/IaruPHcJFLTFxKN93bpLsE" }),
    expect.objectContaining({ href: "/prototypes/aggregate-payment/" }),
    expect.objectContaining({ href: "/prototypes/aggregate-payment/?view=reconciliation" }),
  ]));
  expect(project?.outcome).toContain("实现渠道对账文件自动获取、解析入库与交易匹配，仅对异常差异进行人工复核，形成支付与对账闭环");
});

it("gives every interview case a complete decision narrative", () => {
  for (const project of projects.filter((item) => item.variant === "case")) {
    expect(project.problem.length).toBeGreaterThan(35);
    expect(project.role).toMatch(/负责|完成|主导/);
    expect(project.decisions.length).toBeGreaterThanOrEqual(3);
    expect(project.outcome).toHaveLength(3);
    expect(project.reflection.length).toBeGreaterThan(25);
  }
});

it("captures the Lifecare Garden platform's unified-payment design and result", () => {
  const project = projects.find((item) => item.slug === "lifecaregarden");

  expect(project?.summary).toContain("养老社区业务");
  expect(project?.decisions.map((item) => item.title)).toEqual(expect.arrayContaining([
    "统一支付能力",
    "商户管理模块",
    "交易管理",
    "通道对账",
    "以方案驱动需求确认",
  ]));
  expect(project?.outcome).toContain("订单转化率相比单一支付方式提升约 20%");
});

it("captures the home-information system's room-led workflow model", () => {
  const project = projects.find((item) => item.slug === "home-information-management-system");

  expect(project?.summary).toContain("房号档案");
  expect(project?.decisions.map((item) => item.title)).toEqual(expect.arrayContaining([
    "房号档案作为核心对象",
    "节点化流程与状态控制",
    "多人购房与受控回退",
  ]));
  expect(project?.outcome).toContain("将依赖人工沟通的跨岗位协作过程纳入系统管理");
});

it("provides a recruiter summary and evidence section for every case", () => {
  for (const project of projects) {
    expect(project.summary.length).toBeGreaterThan(30);
    expect(project.decisions.length).toBeGreaterThan(0);
  }
});
