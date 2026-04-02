// 菜单配置
const menuConfig = {
    port: [
        {
            name: '生产调度',
            subItems: [
                '邮轮作业审核',
                '邮轮泊位预定',
                '航班计划审核',
                '航班变更审核',
                '航班动态',
                '调度列表',
                '港口调度',
                '港口夜泊',
                '邮轮审核',
                '码头作业审核',
                '值班人员排班',
                '码头作业记录',
                '泊位预排',
                '移泊统计',
                '签到记录',
                '自动预排设置',
                '航班节点记录',
                '泊位占用记录',
                '邮轮作业报告'
            ]
        },
        {
            name: '运行监控',
            subItems: [
                '渡轮节点监控',
                '航班保障节点监控',
                '邮轮节点监控'
            ]
        },
        {
            name: '数据看板',
            subItems: [
                '船讯网',
                '运营动态',
                '维修效率统计',
                '设备设施状态统计',
                '蛇口停车数据平台',
                '航班延误情况统计',
                '航班动态',
                '航班数据分析',
                '旅客数据统计'
            ]
        },
        {
            name: '操作收费',
            subItems: [
                '收费标准设置',
                '账单审核'
            ]
        },
        {
            name: '资源管理',
            subItems: [
                '设备设施信息',
                '设备设施检查',
                '设备设施保养',
                '设备设施维修',
                '区域巡查',
                '施工巡查',
                '二维码管理',
                '人员档案',
                '责任人管理',
                '责任机构管理',
                '设备班组'
            ]
        },
        {
            name: '基础数据',
            subItems: [
                '预售查询设置',
                '港口管理',
                '渡轮',
                '邮轮'
            ]
        },
        {
            name: '权限管理',
            subItems: [
                '用户管理',
                '角色管理',
                '部门管理',
                '岗位管理'
            ]
        },
        {
            name: '系统设置',
            subItems: [
                '我的消息',
                '通知公告',
                '应用管理',
                '版本管理',
                '字典管理',
                '系统配置'
            ]
        },
        {
            name: '日志管理',
            subItems: [
                '操作日志',
                '登录日志'
            ]
        }
    ],
    ferry: [
        {
            name: '生产调度',
            subItems: [
                '航班计划管理',
                '航班变更管理',
                '航班动态',
                '航班变更记录',
                '港口调度'
            ]
        },
        {
            name: '码头作业申请',
            subItems: [
                '移泊申请',
                '排污申请',
                '加油申请',
                '危险作业申请',
                '船舶演习申请',
                '加水申请',
                '供电申请',
                '上船培训申请',
                '维修申请'
            ]
        },
        {
            name: '系统设置',
            subItems: [
                '用户管理',
                '我的消息'
            ]
        }
    ],
    cruise: [
        {
            name: '生产调度',
            subItems: [
                '邮轮泊位预订',
                '邮轮航班计划管理',
                '邮轮动态跟踪',
                '邮轮信息申请',
                '变更记录查询',
                '作业报告审核',
                '无航班作业申请'
            ]
        },
        {
            name: '系统设置',
            subItems: [
                '用户管理',
                '我的消息'
            ]
        }
    ]
};

// 登录功能
document.addEventListener('DOMContentLoaded', function() {
    // 登录表单提交
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const role = document.querySelector('input[name="role"]:checked').value;
            localStorage.setItem('currentRole', role);
            window.location.href = 'app.html';
        });
    }

    // 主应用页面
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        // 加载当前角色
        const currentRole = localStorage.getItem('currentRole') || 'port';
        document.getElementById('role-select').value = currentRole;
        
        // 生成导航菜单
        generateSidebarMenu(currentRole);
        
        // 角色切换事件
        document.getElementById('role-select').addEventListener('change', function(e) {
            const newRole = e.target.value;
            localStorage.setItem('currentRole', newRole);
            generateSidebarMenu(newRole);
        });
        
        // 退出登录
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('currentRole');
            window.location.href = 'index.html';
        });
        
        // 侧边栏收起/展开
        const toggleBtn = document.getElementById('toggle-btn');
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            // 切换按钮图标
            if (sidebar.classList.contains('collapsed')) {
                toggleBtn.textContent = '>';
            } else {
                toggleBtn.textContent = '≡';
            }
        });
    }
});

// 生成侧边栏菜单
function generateSidebarMenu(role) {
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;
    
    sidebarNav.innerHTML = '';
    
    const menuItems = menuConfig[role];
    menuItems.forEach(item => {
            const navItem = document.createElement('div');
            navItem.className = 'nav-item';
            
            const link = document.createElement('a');
            link.href = '#';
            const linkText = document.createElement('span');
            linkText.textContent = item.name;
            link.appendChild(linkText);
            navItem.appendChild(link);
            
            if (item.subItems && item.subItems.length > 0) {
                const subNav = document.createElement('div');
                subNav.className = 'sub-nav';
                
                item.subItems.forEach(subItem => {
                    const subNavItem = document.createElement('div');
                    subNavItem.className = 'nav-item';
                    
                    const subLink = document.createElement('a');
                    subLink.href = '#';
                    const subLinkText = document.createElement('span');
                    subLinkText.textContent = subItem;
                    subLink.appendChild(subLinkText);
                    subNavItem.appendChild(subLink);
                    
                    subNav.appendChild(subNavItem);
                });
                
                navItem.appendChild(subNav);
            }
            
            sidebarNav.appendChild(navItem);
        });
    
    // 添加点击事件
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const menuText = this.textContent;
            document.getElementById('page-title').textContent = menuText;
            
            // 移除所有活动状态
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // 添加活动状态
            this.parentElement.classList.add('active');
            
            // 生成页面内容
            generatePageContent(role, menuText);
        });
    });
}

// 生成页面内容
function generatePageContent(role, menuText) {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;
    
    // 根据角色和菜单项生成不同的内容
    let content = '';
    
    // 港口调度角色
    if (role === 'port') {
        switch(menuText) {
            case '邮轮作业审核':
                content = generate邮轮作业审核Content();
                break;
            case '邮轮泊位预定':
                content = generate邮轮泊位预定Content();
                break;
            case '航班计划审核':
                content = generate航班计划审核Content();
                break;
            default:
                content = `<div class="page-content"><h3>${menuText}</h3><p>功能开发中...</p></div>`;
        }
    }
    // 渡轮角色
    else if (role === 'ferry') {
        switch(menuText) {
            case '移泊申请':
                content = generate移泊申请Content();
                break;
            case '排污申请':
                content = generate排污申请Content();
                break;
            case '加油申请':
                content = generate加油申请Content();
                break;
            case '危险作业申请':
                content = generate危险作业申请Content();
                break;
            case '船舶演习申请':
                content = generate船舶演习申请Content();
                break;
            case '加水申请':
                content = generate加水申请Content();
                break;
            case '供电申请':
                content = generate供电申请Content();
                break;
            case '上船培训申请':
                content = generate上船培训申请Content();
                break;
            case '维修申请':
                content = generate维修申请Content();
                break;
            default:
                content = `<div class="page-content"><h3>${menuText}</h3><p>功能开发中...</p></div>`;
        }
    }
    // 邮轮代理角色
    else if (role === 'cruise') {
        switch (menuText) {
            case '邮轮泊位预订':
                content = generate邮轮泊位预订Content();
                break;
            case '邮轮航班计划管理':
                content = generate邮轮航班计划管理Content();
                break;
            case '邮轮动态跟踪':
                content = generate邮轮动态跟踪Content();
                break;
            case '邮轮信息申请':
                content = generate邮轮信息申请Content();
                break;
            case '变更记录查询':
                content = generate变更记录查询Content();
                break;
            case '作业报告审核':
                content = generate邮轮作业审核Content();
                break;
            case '无航班作业申请':
                content = generate无航班作业申请Content();
                break;
            default:
                content = `<div class="page-content"><h3>${menuText}</h3><p>功能开发中...</p></div>`;
        }
    }
    
    contentArea.innerHTML = content;
}

// 邮轮作业审核内容生成函数
function generate邮轮作业审核Content() {
    return `
        <div class="page-content">
            <h3>邮轮作业审核</h3>
            <div class="filter-section">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <label>邮轮名称：</label>
                <input type="text" placeholder="请输入邮轮名称">
                <button class="btn">查询</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>作业报告ID</th>
                            <th>邮轮ID</th>
                            <th>关联航班ID</th>
                            <th>作业内容</th>
                            <th>提交时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CRJOB001</td>
                            <td>CR001</td>
                            <td>FL001</td>
                            <td>常规维护作业</td>
                            <td>2026-03-26 10:00</td>
                            <td>待审核</td>
                            <td><button class="btn btn-primary" onclick="openAuditModal('CRJOB001')">审核</button></td>
                        </tr>
                        <tr>
                            <td>CRJOB002</td>
                            <td>CR002</td>
                            <td>FL002</td>
                            <td>设备检修</td>
                            <td>2026-03-26 09:30</td>
                            <td>待审核</td>
                            <td><button class="btn btn-primary" onclick="openAuditModal('CRJOB002')">审核</button></td>
                        </tr>
                        <tr>
                            <td>CRJOB003</td>
                            <td>CR003</td>
                            <td>FL003</td>
                            <td>燃油补给</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn">查看</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 审核模态框 -->
        <div id="auditModal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>邮轮作业审核</h4>
                    <button onclick="closeAuditModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>作业报告ID：</label>
                        <input type="text" id="jobId" readonly>
                    </div>
                    <div class="form-group">
                        <label>邮轮ID：</label>
                        <input type="text" id="cruiseId" readonly>
                    </div>
                    <div class="form-group">
                        <label>关联航班ID：</label>
                        <input type="text" id="flightId" readonly>
                    </div>
                    <div class="form-group">
                        <label>作业内容：</label>
                        <textarea id="jobContent" rows="4" readonly></textarea>
                    </div>
                    <div class="form-group">
                        <label>提交时间：</label>
                        <input type="text" id="submitTime" readonly>
                    </div>
                    <div class="form-group">
                        <label>审核意见：</label>
                        <textarea id="auditComment" rows="4" placeholder="请输入审核意见"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="closeAuditModal()" class="btn">取消</button>
                    <button onclick="auditJob('pass')" class="btn btn-primary">通过</button>
                    <button onclick="auditJob('reject')" class="btn btn-danger">不通过</button>
                </div>
            </div>
        </div>
    `;
}

// 邮轮泊位预定内容生成函数
function generate邮轮泊位预定Content() {
    return `
        <div class="page-content">
            <h3>邮轮泊位预定</h3>
            <div class="tab-container">
                <div class="tabs">
                    <button class="tab-btn active" onclick="switchTab('berth-query')">泊位查询</button>
                    <button class="tab-btn" onclick="switchTab('score-config')">加分减分配置</button>
                    <button class="tab-btn" onclick="switchTab('company-config')">船司预定配置</button>
                    <button class="tab-btn" onclick="switchTab('change-statistics')">泊位预订变更统计</button>
                </div>
                
                <!-- 泊位查询 -->
                <div id="berth-query" class="tab-content active">
                    <div class="filter-section">
                        <label>日期：</label>
                        <input type="date">
                        <label>泊位类型：</label>
                        <select>
                            <option>全部</option>
                            <option>大型邮轮泊位</option>
                            <option>中型邮轮泊位</option>
                            <option>小型邮轮泊位</option>
                        </select>
                        <label>状态：</label>
                        <select>
                            <option>全部</option>
                            <option>可用</option>
                            <option>已预订</option>
                            <option>已锁定</option>
                        </select>
                        <button class="btn">查询</button>
                    </div>
                    <div class="table-section">
                        <table>
                            <thead>
                                <tr>
                                    <th>泊位ID</th>
                                    <th>泊位类型</th>
                                    <th>可容纳吨位</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>B001</td>
                                    <td>大型邮轮泊位</td>
                                    <td>10万吨</td>
                                    <td>可用</td>
                                    <td><button class="btn btn-primary">预订</button></td>
                                </tr>
                                <tr>
                                    <td>B002</td>
                                    <td>中型邮轮泊位</td>
                                    <td>5万吨</td>
                                    <td>已预订</td>
                                    <td><button class="btn">查看</button></td>
                                </tr>
                                <tr>
                                    <td>B003</td>
                                    <td>小型邮轮泊位</td>
                                    <td>2万吨</td>
                                    <td>可用</td>
                                    <td><button class="btn btn-primary">预订</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- 加分减分配置 -->
                <div id="score-config" class="tab-content">
                    <div class="action-bar">
                        <button class="btn btn-primary">新增配置</button>
                        <button class="btn">批量导入</button>
                    </div>
                    <div class="table-section">
                        <table>
                            <thead>
                                <tr>
                                    <th>船公司ID</th>
                                    <th>船公司名称</th>
                                    <th>基础分数</th>
                                    <th>加减分项目</th>
                                    <th>加减分数</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CC001</td>
                                    <td>皇家加勒比</td>
                                    <td>100</td>
                                    <td>按时支付预付款</td>
                                    <td>+10</td>
                                    <td><button class="btn">编辑</button></td>
                                </tr>
                                <tr>
                                    <td>CC002</td>
                                    <td>歌诗达邮轮</td>
                                    <td>100</td>
                                    <td>历史运营表现良好</td>
                                    <td>+5</td>
                                    <td><button class="btn">编辑</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- 船司预定配置 -->
                <div id="company-config" class="tab-content">
                    <div class="action-bar">
                        <button class="btn btn-primary">新增配置</button>
                    </div>
                    <div class="table-section">
                        <table>
                            <thead>
                                <tr>
                                    <th>船公司ID</th>
                                    <th>船公司名称</th>
                                    <th>预付款支付意愿</th>
                                    <th>支付时间要求</th>
                                    <th>历史表现评分</th>
                                    <th>优先级</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CC001</td>
                                    <td>皇家加勒比</td>
                                    <td>高</td>
                                    <td>7天</td>
                                    <td>95</td>
                                    <td>1</td>
                                    <td><button class="btn">编辑</button></td>
                                </tr>
                                <tr>
                                    <td>CC002</td>
                                    <td>歌诗达邮轮</td>
                                    <td>中</td>
                                    <td>14天</td>
                                    <td>90</td>
                                    <td>2</td>
                                    <td><button class="btn">编辑</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- 泊位预订变更统计 -->
                <div id="change-statistics" class="tab-content">
                    <div class="filter-section">
                        <label>时间范围：</label>
                        <input type="date">
                        <span>至</span>
                        <input type="date">
                        <button class="btn">查询</button>
                    </div>
                    <div class="dashboard-section">
                        <div class="dashboard-card">
                            <h4>预订变更统计</h4>
                            <div class="chart-placeholder">[预订变更统计图表]</div>
                        </div>
                        <div class="dashboard-card">
                            <h4>预付款优惠指标</h4>
                            <div class="chart-placeholder">[预付款优惠指标图表]</div>
                        </div>
                    </div>
                    <div class="table-section">
                        <h4>运营数据汇总</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>统计周期</th>
                                    <th>预订总数</th>
                                    <th>变更数量</th>
                                    <th>预付款金额</th>
                                    <th>平均优先级</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2026-03</td>
                                    <td>15</td>
                                    <td>3</td>
                                    <td>¥1,500,000</td>
                                    <td>1.8</td>
                                </tr>
                                <tr>
                                    <td>2026-02</td>
                                    <td>12</td>
                                    <td>2</td>
                                    <td>¥1,200,000</td>
                                    <td>2.0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 航班计划审核内容生成函数
function generate航班计划审核Content() {
    return `
        <div class="page-content">
            <h3>航班计划审核</h3>
            <div class="tab-container">
                <div class="tabs">
                    <button class="tab-btn active" onclick="switchTab('ferry-plan')">渡轮计划审核</button>
                    <button class="tab-btn" onclick="switchTab('cruise-plan')">邮轮计划审核</button>
                </div>
                
                <!-- 渡轮计划审核 -->
                <div id="ferry-plan" class="tab-content active">
                    <div class="action-bar">
                        <button class="btn btn-primary">批量审核</button>
                        <button class="btn">导出</button>
                    </div>
                    <div class="filter-section">
                        <label>航线：</label>
                        <select>
                            <option>全部</option>
                            <option>蛇口-香港</option>
                            <option>蛇口-澳门</option>
                            <option>蛇口-珠海</option>
                        </select>
                        <label>船公司：</label>
                        <select>
                            <option>全部</option>
                            <option>招商蛇口</option>
                            <option>香港中旅</option>
                            <option>澳门航空</option>
                        </select>
                        <label>计划状态：</label>
                        <select>
                            <option>全部</option>
                            <option>待审核</option>
                            <option>已通过</option>
                            <option>已拒绝</option>
                        </select>
                        <button class="btn">查询</button>
                    </div>
                    <div class="table-section">
                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox"></th>
                                    <th>计划ID</th>
                                    <th>航班号</th>
                                    <th>船舶ID</th>
                                    <th>航线</th>
                                    <th>计划日期</th>
                                    <th>开航时间</th>
                                    <th>到达时间</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox"></td>
                                    <td>FP001</td>
                                    <td>DF001</td>
                                    <td>SHIP001</td>
                                    <td>蛇口-香港</td>
                                    <td>2026-03-27</td>
                                    <td>08:00</td>
                                    <td>09:00</td>
                                    <td>待审核</td>
                                    <td>
                                        <button class="btn" onclick="previewPlan('FP001')">预览</button>
                                        <button class="btn" onclick="comparePlan('FP001')">对比</button>
                                        <button class="btn btn-primary" onclick="auditPlan('FP001')">审核</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox"></td>
                                    <td>FP002</td>
                                    <td>DF002</td>
                                    <td>SHIP002</td>
                                    <td>蛇口-澳门</td>
                                    <td>2026-03-27</td>
                                    <td>09:00</td>
                                    <td>10:30</td>
                                    <td>待审核</td>
                                    <td>
                                        <button class="btn" onclick="previewPlan('FP002')">预览</button>
                                        <button class="btn" onclick="comparePlan('FP002')">对比</button>
                                        <button class="btn btn-primary" onclick="auditPlan('FP002')">审核</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox"></td>
                                    <td>FP003</td>
                                    <td>DF003</td>
                                    <td>SHIP003</td>
                                    <td>蛇口-珠海</td>
                                    <td>2026-03-27</td>
                                    <td>10:00</td>
                                    <td>10:45</td>
                                    <td>已通过</td>
                                    <td>
                                        <button class="btn" onclick="previewPlan('FP003')">预览</button>
                                        <button class="btn" onclick="comparePlan('FP003')">对比</button>
                                        <button class="btn">查看</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- 邮轮计划审核 -->
                <div id="cruise-plan" class="tab-content">
                    <div class="action-bar">
                        <button class="btn btn-primary">批量审核</button>
                        <button class="btn">导出</button>
                    </div>
                    <div class="filter-section">
                        <label>航线：</label>
                        <select>
                            <option>全部</option>
                            <option>蛇口-日本</option>
                            <option>蛇口-东南亚</option>
                            <option>蛇口-澳洲</option>
                        </select>
                        <label>船公司：</label>
                        <select>
                            <option>全部</option>
                            <option>皇家加勒比</option>
                            <option>歌诗达邮轮</option>
                            <option>公主邮轮</option>
                        </select>
                        <label>计划状态：</label>
                        <select>
                            <option>全部</option>
                            <option>待审核</option>
                            <option>已通过</option>
                            <option>已拒绝</option>
                        </select>
                        <button class="btn">查询</button>
                    </div>
                    <div class="table-section">
                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox"></th>
                                    <th>计划ID</th>
                                    <th>航班号</th>
                                    <th>船舶ID</th>
                                    <th>航线</th>
                                    <th>计划日期</th>
                                    <th>开航时间</th>
                                    <th>到达时间</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox"></td>
                                    <td>CP001</td>
                                    <td>CR001</td>
                                    <td>CRUISE001</td>
                                    <td>蛇口-日本</td>
                                    <td>2026-04-01</td>
                                    <td>14:00</td>
                                    <td>2026-04-03 10:00</td>
                                    <td>待审核</td>
                                    <td>
                                        <button class="btn" onclick="previewPlan('CP001')">预览</button>
                                        <button class="btn" onclick="comparePlan('CP001')">对比</button>
                                        <button class="btn btn-primary" onclick="auditPlan('CP001')">审核</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox"></td>
                                    <td>CP002</td>
                                    <td>CR002</td>
                                    <td>CRUISE002</td>
                                    <td>蛇口-东南亚</td>
                                    <td>2026-04-05</td>
                                    <td>16:00</td>
                                    <td>2026-04-08 08:00</td>
                                    <td>待审核</td>
                                    <td>
                                        <button class="btn" onclick="previewPlan('CP002')">预览</button>
                                        <button class="btn" onclick="comparePlan('CP002')">对比</button>
                                        <button class="btn btn-primary" onclick="auditPlan('CP002')">审核</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 预览模态框 -->
        <div id="previewModal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>航班计划预览</h4>
                    <button onclick="closePreviewModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>计划ID：</label>
                        <input type="text" id="previewPlanId" readonly>
                    </div>
                    <div class="form-group">
                        <label>航班号：</label>
                        <input type="text" id="previewFlightNo" readonly>
                    </div>
                    <div class="form-group">
                        <label>船舶ID：</label>
                        <input type="text" id="previewShipId" readonly>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="closePreviewModal()" class="btn">关闭</button>
                </div>
            </div>
        </div>
    `;
}

// 移泊申请内容生成函数
function generate移泊申请Content() {
    return `
        <div class="page-content">
            <h3>移泊申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open移泊申请Modal()">发起移泊申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>原泊位：</label>
                <input type="text" placeholder="请输入原泊位编号">
                <label>目标泊位：</label>
                <input type="text" placeholder="请输入目标泊位编号">
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>原泊位</th>
                            <th>目标泊位</th>
                            <th>申请时间</th>
                            <th>计划移泊时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>YB001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>B002</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view移泊申请Detail('YB001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel移泊申请('YB001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>YB002</td>
                            <td>招商二号</td>
                            <td>B003</td>
                            <td>B001</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view移泊申请Detail('YB002')">查看</button></td>
                        </tr>
                        <tr>
                            <td>YB003</td>
                            <td>招商三号</td>
                            <td>B002</td>
                            <td>B003</td>
                            <td>2026-03-26 10:00</td>
                            <td>2026-03-26 15:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view移泊申请Detail('YB003')">查看</button>
                                <button class="btn btn-danger" onclick="cancel移泊申请('YB003')">撤销</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起移泊申请模态框 -->
        <div id="移泊申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起移泊申请</h4>
                    <button onclick="close移泊申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                                <option>招商四号</option>
                                <option>招商五号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>目标泊位：</label>
                            <select>
                                <option>B001</option>
                                <option>B002</option>
                                <option>B003</option>
                                <option>B004</option>
                                <option>B005</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>计划移泊时间：</label>
                            <input type="datetime-local" value="2026-03-26T14:00">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>移泊原因：</label>
                        <textarea rows="3" placeholder="请详细说明移泊原因"></textarea>
                    </div>
                    <div class="form-group">
                        <label>特殊要求：</label>
                        <textarea rows="2" placeholder="如有特殊要求请说明"></textarea>
                    </div>
                    <div class="form-group">
                        <label>联系人：</label>
                        <input type="text" placeholder="请输入联系人姓名">
                    </div>
                    <div class="form-group">
                        <label>联系电话：</label>
                        <input type="text" placeholder="请输入联系电话">
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close移泊申请Modal()" class="btn">取消</button>
                    <button onclick="submit移泊申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
        <!-- 移泊申请详情模态框 -->
        <div id="移泊申请DetailModal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>移泊申请详情</h4>
                    <button onclick="close移泊申请DetailModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-section">
                        <h5>基本信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>申请编号：</label>
                                <input type="text" id="移泊申请Detail编号" readonly>
                            </div>
                            <div class="form-group">
                                <label>船舶名称：</label>
                                <input type="text" id="移泊申请Detail船舶" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>原泊位：</label>
                                <input type="text" id="移泊申请Detail原泊位" readonly>
                            </div>
                            <div class="form-group">
                                <label>目标泊位：</label>
                                <input type="text" id="移泊申请Detail目标泊位" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>移泊信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>计划移泊时间：</label>
                                <input type="text" id="移泊申请Detail时间" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>移泊原因：</label>
                            <textarea id="移泊申请Detail原因" rows="3" readonly></textarea>
                        </div>
                        <div class="form-group">
                            <label>特殊要求：</label>
                            <textarea id="移泊申请Detail要求" rows="2" readonly></textarea>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>联系信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>联系人：</label>
                                <input type="text" id="移泊申请Detail联系人" readonly>
                            </div>
                            <div class="form-group">
                                <label>联系电话：</label>
                                <input type="text" id="移泊申请Detail电话" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>审核信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>申请时间：</label>
                                <input type="text" id="移泊申请Detail申请时间" readonly>
                            </div>
                            <div class="form-group">
                                <label>申请人：</label>
                                <input type="text" id="移泊申请Detail申请人" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>审核状态：</label>
                                <input type="text" id="移泊申请Detail状态" readonly>
                            </div>
                            <div class="form-group">
                                <label>审核时间：</label>
                                <input type="text" id="移泊申请Detail审核时间" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>审核意见：</label>
                            <textarea id="移泊申请Detail审核意见" rows="3" readonly></textarea>
                        </div>
                        <div class="form-group">
                            <label>备注：</label>
                            <input type="text" id="移泊申请Detail备注" readonly>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close移泊申请DetailModal()" class="btn">关闭</button>
                </div>
            </div>
        </div>
    `;
}

// 排污申请内容生成函数
function generate排污申请Content() {
    return `
        <div class="page-content">
            <h3>排污申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open排污申请Modal()">发起排污申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>泊位编号：</label>
                <input type="text" placeholder="请输入泊位编号">
                <label>排污类型：</label>
                <select>
                    <option>全部</option>
                    <option>生活污水</option>
                    <option>油污水</option>
                    <option>垃圾</option>
                </select>
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>泊位编号</th>
                            <th>排污类型</th>
                            <th>排污量</th>
                            <th>申请时间</th>
                            <th>计划排污时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PW001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>生活污水</td>
                            <td>10吨</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view排污申请Detail('PW001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel排污申请('PW001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>PW002</td>
                            <td>招商二号</td>
                            <td>B002</td>
                            <td>油污水</td>
                            <td>5吨</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view排污申请Detail('PW002')">查看</button></td>
                        </tr>
                        <tr>
                            <td>PW003</td>
                            <td>招商三号</td>
                            <td>B003</td>
                            <td>垃圾</td>
                            <td>2吨</td>
                            <td>2026-03-26 10:00</td>
                            <td>2026-03-26 15:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view排污申请Detail('PW003')">查看</button>
                                <button class="btn btn-danger" onclick="cancel排污申请('PW003')">撤销</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起排污申请模态框 -->
        <div id="排污申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起排污申请</h4>
                    <button onclick="close排污申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                                <option>招商四号</option>
                                <option>招商五号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>排污类型：</label>
                            <select>
                                <option>生活污水</option>
                                <option>油污水</option>
                                <option>垃圾</option>
                                <option>其他</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>排污量：</label>
                            <input type="number" placeholder="请输入排污量">
                            <select>
                                <option>吨</option>
                                <option>立方米</option>
                                <option>千克</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>计划排污时间：</label>
                            <input type="datetime-local" value="2026-03-26T14:00">
                        </div>
                        <div class="form-group">
                            <label>预计耗时：</label>
                            <input type="text" placeholder="请输入预计耗时（小时）">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>排污描述：</label>
                        <textarea rows="3" placeholder="请详细描述排污情况"></textarea>
                    </div>
                    <div class="form-group">
                        <label>接收单位：</label>
                        <input type="text" placeholder="请输入接收单位名称">
                    </div>
                    <div class="form-group">
                        <label>联系人：</label>
                        <input type="text" placeholder="请输入联系人姓名">
                    </div>
                    <div class="form-group">
                        <label>联系电话：</label>
                        <input type="text" placeholder="请输入联系电话">
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close排污申请Modal()" class="btn">取消</button>
                    <button onclick="submit排污申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
        <!-- 排污申请详情模态框 -->
        <div id="排污申请DetailModal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>排污申请详情</h4>
                    <button onclick="close排污申请DetailModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-section">
                        <h5>基本信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>申请编号：</label>
                                <input type="text" id="排污申请Detail编号" readonly>
                            </div>
                            <div class="form-group">
                                <label>船舶名称：</label>
                                <input type="text" id="排污申请Detail船舶" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>泊位编号：</label>
                                <input type="text" id="排污申请Detail泊位" readonly>
                            </div>
                            <div class="form-group">
                                <label>排污类型：</label>
                                <input type="text" id="排污申请Detail类型" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>排污信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>排污量：</label>
                                <input type="text" id="排污申请Detail数量" readonly>
                            </div>
                            <div class="form-group">
                                <label>计划排污时间：</label>
                                <input type="text" id="排污申请Detail时间" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>排污描述：</label>
                            <textarea id="排污申请Detail描述" rows="3" readonly></textarea>
                        </div>
                        <div class="form-group">
                            <label>接收单位：</label>
                            <input type="text" id="排污申请Detail单位" readonly>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>联系信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>联系人：</label>
                                <input type="text" id="排污申请Detail联系人" readonly>
                            </div>
                            <div class="form-group">
                                <label>联系电话：</label>
                                <input type="text" id="排污申请Detail电话" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>审核信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>申请时间：</label>
                                <input type="text" id="排污申请Detail申请时间" readonly>
                            </div>
                            <div class="form-group">
                                <label>申请人：</label>
                                <input type="text" id="排污申请Detail申请人" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>审核状态：</label>
                                <input type="text" id="排污申请Detail状态" readonly>
                            </div>
                            <div class="form-group">
                                <label>审核时间：</label>
                                <input type="text" id="排污申请Detail审核时间" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>审核意见：</label>
                            <textarea id="排污申请Detail审核意见" rows="3" readonly></textarea>
                        </div>
                        <div class="form-group">
                            <label>备注：</label>
                            <input type="text" id="排污申请Detail备注" readonly>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close排污申请DetailModal()" class="btn">关闭</button>
                </div>
            </div>
        </div>
    `;
}

// 加油申请内容生成函数
function generate加油申请Content() {
    return `
        <div class="page-content">
            <h3>加油申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open加油申请Modal()">发起加油申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>泊位编号：</label>
                <input type="text" placeholder="请输入泊位编号">
                <label>油品类型：</label>
                <select>
                    <option>全部</option>
                    <option>柴油</option>
                    <option>汽油</option>
                    <option>重油</option>
                </select>
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>泊位编号</th>
                            <th>油品类型</th>
                            <th>加油量(吨)</th>
                            <th>申请时间</th>
                            <th>计划加油时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>JY001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>柴油</td>
                            <td>50</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view加油申请Detail('JY001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel加油申请('JY001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>JY002</td>
                            <td>招商二号</td>
                            <td>B002</td>
                            <td>重油</td>
                            <td>100</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view加油申请Detail('JY002')">查看</button></td>
                        </tr>
                        <tr>
                            <td>JY003</td>
                            <td>招商三号</td>
                            <td>B003</td>
                            <td>汽油</td>
                            <td>20</td>
                            <td>2026-03-26 10:00</td>
                            <td>2026-03-26 15:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view加油申请Detail('JY003')">查看</button>
                                <button class="btn btn-danger" onclick="cancel加油申请('JY003')">撤销</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起加油申请模态框 -->
        <div id="加油申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起加油申请</h4>
                    <button onclick="close加油申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                                <option>招商四号</option>
                                <option>招商五号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>油品类型：</label>
                            <select>
                                <option>柴油</option>
                                <option>汽油</option>
                                <option>重油</option>
                                <option>其他</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>加油量(吨)：</label>
                            <input type="number" placeholder="请输入加油量">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>计划加油时间：</label>
                            <input type="datetime-local" value="2026-03-26T14:00">
                        </div>
                        <div class="form-group">
                            <label>预计耗时：</label>
                            <input type="text" placeholder="请输入预计耗时（小时）">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>加油原因：</label>
                        <textarea rows="2" placeholder="请说明加油原因"></textarea>
                    </div>
                    <div class="form-group">
                        <label>加油供应商：</label>
                        <input type="text" placeholder="请输入加油供应商名称">
                    </div>
                    <div class="form-group">
                        <label>联系人：</label>
                        <input type="text" placeholder="请输入联系人姓名">
                    </div>
                    <div class="form-group">
                        <label>联系电话：</label>
                        <input type="text" placeholder="请输入联系电话">
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close加油申请Modal()" class="btn">取消</button>
                    <button onclick="submit加油申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
        <!-- 加油申请详情模态框 -->
        <div id="加油申请DetailModal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>加油申请详情</h4>
                    <button onclick="close加油申请DetailModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-section">
                        <h5>基本信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>申请编号：</label>
                                <input type="text" id="加油申请Detail编号" readonly>
                            </div>
                            <div class="form-group">
                                <label>船舶名称：</label>
                                <input type="text" id="加油申请Detail船舶" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>泊位编号：</label>
                                <input type="text" id="加油申请Detail泊位" readonly>
                            </div>
                            <div class="form-group">
                                <label>油品类型：</label>
                                <input type="text" id="加油申请Detail类型" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>加油信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>加油量：</label>
                                <input type="text" id="加油申请Detail数量" readonly>
                            </div>
                            <div class="form-group">
                                <label>计划加油时间：</label>
                                <input type="text" id="加油申请Detail时间" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>加油原因：</label>
                            <textarea id="加油申请Detail原因" rows="2" readonly></textarea>
                        </div>
                        <div class="form-group">
                            <label>加油供应商：</label>
                            <input type="text" id="加油申请Detail供应商" readonly>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>联系信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>联系人：</label>
                                <input type="text" id="加油申请Detail联系人" readonly>
                            </div>
                            <div class="form-group">
                                <label>联系电话：</label>
                                <input type="text" id="加油申请Detail电话" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>审核信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>申请时间：</label>
                                <input type="text" id="加油申请Detail申请时间" readonly>
                            </div>
                            <div class="form-group">
                                <label>申请人：</label>
                                <input type="text" id="加油申请Detail申请人" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>审核状态：</label>
                                <input type="text" id="加油申请Detail状态" readonly>
                            </div>
                            <div class="form-group">
                                <label>审核时间：</label>
                                <input type="text" id="加油申请Detail审核时间" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>审核意见：</label>
                            <textarea id="加油申请Detail审核意见" rows="3" readonly></textarea>
                        </div>
                        <div class="form-group">
                            <label>备注：</label>
                            <input type="text" id="加油申请Detail备注" readonly>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close加油申请DetailModal()" class="btn">关闭</button>
                </div>
            </div>
        </div>
    `;
}

// 危险作业申请内容生成函数
function generate危险作业申请Content() {
    return `
        <div class="page-content">
            <h3>危险作业申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open危险作业申请Modal()">发起危险作业申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>泊位编号：</label>
                <input type="text" placeholder="请输入泊位编号">
                <label>作业类型：</label>
                <select>
                    <option>全部</option>
                    <option>明火作业</option>
                    <option>高空作业</option>
                    <option>受限空间作业</option>
                    <option>吊装作业</option>
                </select>
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>泊位编号</th>
                            <th>作业类型</th>
                            <th>作业内容</th>
                            <th>申请时间</th>
                            <th>计划作业时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>WXZY001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>明火作业</td>
                            <td>焊接作业</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view危险作业申请Detail('WXZY001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel危险作业申请('WXZY001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>WXZY002</td>
                            <td>招商二号</td>
                            <td>B002</td>
                            <td>高空作业</td>
                            <td>天线维修</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view危险作业申请Detail('WXZY002')">查看</button></td>
                        </tr>
                        <tr>
                            <td>WXZY003</td>
                            <td>招商三号</td>
                            <td>B003</td>
                            <td>受限空间作业</td>
                            <td>船舱检查</td>
                            <td>2026-03-26 10:00</td>
                            <td>2026-03-26 15:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view危险作业申请Detail('WXZY003')">查看</button>
                                <button class="btn btn-danger" onclick="cancel危险作业申请('WXZY003')">撤销</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起危险作业申请模态框 -->
        <div id="危险作业申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起危险作业申请</h4>
                    <button onclick="close危险作业申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                                <option>招商四号</option>
                                <option>招商五号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>作业类型：</label>
                            <select>
                                <option>明火作业</option>
                                <option>高空作业</option>
                                <option>受限空间作业</option>
                                <option>吊装作业</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>作业级别：</label>
                            <select>
                                <option>一级</option>
                                <option>二级</option>
                                <option>三级</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>计划作业开始时间：</label>
                            <input type="datetime-local" value="2026-03-26T14:00">
                        </div>
                        <div class="form-group">
                            <label>计划作业结束时间：</label>
                            <input type="datetime-local" value="2026-03-26T16:00">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>作业内容：</label>
                        <textarea rows="3" placeholder="请详细描述作业内容"></textarea>
                    </div>
                    <div class="form-group">
                        <label>作业地点：</label>
                        <input type="text" placeholder="请输入作业具体地点">
                    </div>
                    <div class="form-group">
                        <label>安全措施：</label>
                        <textarea rows="3" placeholder="请描述采取的安全措施"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>作业负责人：</label>
                            <input type="text" placeholder="请输入作业负责人姓名">
                        </div>
                        <div class="form-group">
                            <label>联系电话：</label>
                            <input type="text" placeholder="请输入联系电话">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close危险作业申请Modal()" class="btn">取消</button>
                    <button onclick="submit危险作业申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
        <!-- 危险作业申请详情模态框 -->
        <div id="危险作业申请DetailModal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>危险作业申请详情</h4>
                    <button onclick="close危险作业申请DetailModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-section">
                        <h5>基本信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>申请编号：</label>
                                <input type="text" id="危险作业申请Detail编号" readonly>
                            </div>
                            <div class="form-group">
                                <label>船舶名称：</label>
                                <input type="text" id="危险作业申请Detail船舶" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>泊位编号：</label>
                                <input type="text" id="危险作业申请Detail泊位" readonly>
                            </div>
                            <div class="form-group">
                                <label>作业类型：</label>
                                <input type="text" id="危险作业申请Detail类型" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>作业信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>作业级别：</label>
                                <input type="text" id="危险作业申请Detail级别" readonly>
                            </div>
                            <div class="form-group">
                                <label>作业地点：</label>
                                <input type="text" id="危险作业申请Detail地点" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>计划作业开始时间：</label>
                                <input type="text" id="危险作业申请Detail开始时间" readonly>
                            </div>
                            <div class="form-group">
                                <label>计划作业结束时间：</label>
                                <input type="text" id="危险作业申请Detail结束时间" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>作业内容：</label>
                            <textarea id="危险作业申请Detail内容" rows="3" readonly></textarea>
                        </div>
                        <div class="form-group">
                            <label>安全措施：</label>
                            <textarea id="危险作业申请Detail安全措施" rows="3" readonly></textarea>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>联系信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>作业负责人：</label>
                                <input type="text" id="危险作业申请Detail负责人" readonly>
                            </div>
                            <div class="form-group">
                                <label>联系电话：</label>
                                <input type="text" id="危险作业申请Detail电话" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5>审核信息</h5>
                        <div class="form-row">
                            <div class="form-group">
                                <label>申请时间：</label>
                                <input type="text" id="危险作业申请Detail申请时间" readonly>
                            </div>
                            <div class="form-group">
                                <label>申请人：</label>
                                <input type="text" id="危险作业申请Detail申请人" readonly>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>审核状态：</label>
                                <input type="text" id="危险作业申请Detail状态" readonly>
                            </div>
                            <div class="form-group">
                                <label>审核时间：</label>
                                <input type="text" id="危险作业申请Detail审核时间" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>审核意见：</label>
                            <textarea id="危险作业申请Detail审核意见" rows="3" readonly></textarea>
                        </div>
                        <div class="form-group">
                            <label>备注：</label>
                            <input type="text" id="危险作业申请Detail备注" readonly>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close危险作业申请DetailModal()" class="btn">关闭</button>
                </div>
            </div>
        </div>
    `;
}

// 船舶演习申请内容生成函数
function generate船舶演习申请Content() {
    return `
        <div class="page-content">
            <h3>船舶演习申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open船舶演习申请Modal()">发起船舶演习申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>泊位编号：</label>
                <input type="text" placeholder="请输入泊位编号">
                <label>演习类型：</label>
                <select>
                    <option>全部</option>
                    <option>消防演习</option>
                    <option>救生演习</option>
                    <option>防污染演习</option>
                    <option>弃船演习</option>
                </select>
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>泊位编号</th>
                            <th>演习类型</th>
                            <th>演习内容</th>
                            <th>申请时间</th>
                            <th>计划演习时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CBYX001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>消防演习</td>
                            <td>火灾应急演练</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view船舶演习申请Detail('CBYX001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel船舶演习申请('CBYX001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>CBYX002</td>
                            <td>招商二号</td>
                            <td>B002</td>
                            <td>救生演习</td>
                            <td>救生艇操作演练</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view船舶演习申请Detail('CBYX002')">查看</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起船舶演习申请模态框 -->
        <div id="船舶演习申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起船舶演习申请</h4>
                    <button onclick="close船舶演习申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>演习类型：</label>
                            <select>
                                <option>消防演习</option>
                                <option>救生演习</option>
                                <option>防污染演习</option>
                                <option>弃船演习</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>计划演习时间：</label>
                            <input type="datetime-local" value="2026-03-26T14:00">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>演习内容：</label>
                        <textarea rows="3" placeholder="请详细描述演习内容"></textarea>
                    </div>
                    <div class="form-group">
                        <label>参与人员：</label>
                        <input type="text" placeholder="请输入参与人员姓名">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>联系人：</label>
                            <input type="text" placeholder="请输入联系人姓名">
                        </div>
                        <div class="form-group">
                            <label>联系电话：</label>
                            <input type="text" placeholder="请输入联系电话">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close船舶演习申请Modal()" class="btn">取消</button>
                    <button onclick="submit船舶演习申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
    `;
}

// 加水申请内容生成函数
function generate加水申请Content() {
    return `
        <div class="page-content">
            <h3>加水申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open加水申请Modal()">发起加水申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>泊位编号：</label>
                <input type="text" placeholder="请输入泊位编号">
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>泊位编号</th>
                            <th>加水量</th>
                            <th>申请时间</th>
                            <th>计划加水时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>JSSQ001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>20吨</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view加水申请Detail('JSSQ001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel加水申请('JSSQ001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>JSSQ002</td>
                            <td>招商二号</td>
                            <td>B002</td>
                            <td>15吨</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view加水申请Detail('JSSQ002')">查看</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起加水申请模态框 -->
        <div id="加水申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起加水申请</h4>
                    <button onclick="close加水申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>加水量：</label>
                            <input type="number" placeholder="请输入加水量">
                            <select>
                                <option>吨</option>
                                <option>立方米</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>计划加水时间：</label>
                            <input type="datetime-local" value="2026-03-26T14:00">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>联系人：</label>
                            <input type="text" placeholder="请输入联系人姓名">
                        </div>
                        <div class="form-group">
                            <label>联系电话：</label>
                            <input type="text" placeholder="请输入联系电话">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close加水申请Modal()" class="btn">取消</button>
                    <button onclick="submit加水申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
    `;
}

// 供电申请内容生成函数
function generate供电申请Content() {
    return `
        <div class="page-content">
            <h3>供电申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open供电申请Modal()">发起供电申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>泊位编号：</label>
                <input type="text" placeholder="请输入泊位编号">
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>泊位编号</th>
                            <th>供电功率</th>
                            <th>申请时间</th>
                            <th>计划供电时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>GDSQ001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>500kW</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view供电申请Detail('GDSQ001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel供电申请('GDSQ001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>GDSQ002</td>
                            <td>招商二号</td>
                            <td>B002</td>
                            <td>300kW</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view供电申请Detail('GDSQ002')">查看</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起供电申请模态框 -->
        <div id="供电申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起供电申请</h4>
                    <button onclick="close供电申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>供电功率：</label>
                            <input type="number" placeholder="请输入供电功率">
                            <select>
                                <option>kW</option>
                                <option>MW</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>计划供电开始时间：</label>
                            <input type="datetime-local" value="2026-03-26T14:00">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>计划供电结束时间：</label>
                        <input type="datetime-local" value="2026-03-26T18:00">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>联系人：</label>
                            <input type="text" placeholder="请输入联系人姓名">
                        </div>
                        <div class="form-group">
                            <label>联系电话：</label>
                            <input type="text" placeholder="请输入联系电话">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close供电申请Modal()" class="btn">取消</button>
                    <button onclick="submit供电申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
    `;
}

// 上船培训申请内容生成函数
function generate上船培训申请Content() {
    return `
        <div class="page-content">
            <h3>上船培训申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open上船培训申请Modal()">发起上船培训申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>泊位编号：</label>
                <input type="text" placeholder="请输入泊位编号">
                <label>培训类型：</label>
                <select>
                    <option>全部</option>
                    <option>安全培训</option>
                    <option>操作培训</option>
                    <option>应急培训</option>
                </select>
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>泊位编号</th>
                            <th>培训类型</th>
                            <th>培训人数</th>
                            <th>申请时间</th>
                            <th>计划培训时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SCPX001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>安全培训</td>
                            <td>10人</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view上船培训申请Detail('SCPX001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel上船培训申请('SCPX001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>SCPX002</td>
                            <td>招商二号</td>
                            <td>B002</td>
                            <td>操作培训</td>
                            <td>5人</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view上船培训申请Detail('SCPX002')">查看</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起上船培训申请模态框 -->
        <div id="上船培训申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起上船培训申请</h4>
                    <button onclick="close上船培训申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>培训类型：</label>
                            <select>
                                <option>安全培训</option>
                                <option>操作培训</option>
                                <option>应急培训</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>培训人数：</label>
                            <input type="number" placeholder="请输入培训人数">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>培训内容：</label>
                        <textarea rows="3" placeholder="请详细描述培训内容"></textarea>
                    </div>
                    <div class="form-group">
                        <label>计划培训时间：</label>
                        <input type="datetime-local" value="2026-03-26T14:00">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>联系人：</label>
                            <input type="text" placeholder="请输入联系人姓名">
                        </div>
                        <div class="form-group">
                            <label>联系电话：</label>
                            <input type="text" placeholder="请输入联系电话">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close上船培训申请Modal()" class="btn">取消</button>
                    <button onclick="submit上船培训申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
    `;
}

// 维修申请内容生成函数
function generate维修申请Content() {
    return `
        <div class="page-content">
            <h3>维修申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary" onclick="open维修申请Modal()">发起维修申请</button>
                <button class="btn">导出记录</button>
            </div>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>泊位编号：</label>
                <input type="text" placeholder="请输入泊位编号">
                <label>维修类型：</label>
                <select>
                    <option>全部</option>
                    <option>常规维修</option>
                    <option>紧急维修</option>
                    <option>定期维护</option>
                </select>
                <label>申请时间：</label>
                <input type="date" value="2026-03-26">
                <label>至</label>
                <input type="date" value="2026-03-26">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn btn-primary">查询</button>
                <button class="btn">重置</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>船舶名称</th>
                            <th>泊位编号</th>
                            <th>维修类型</th>
                            <th>维修内容</th>
                            <th>申请时间</th>
                            <th>计划维修时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>WXSSQ001</td>
                            <td>招商一号</td>
                            <td>B001</td>
                            <td>常规维修</td>
                            <td>设备检修</td>
                            <td>2026-03-26 09:00</td>
                            <td>2026-03-26 14:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn" onclick="view维修申请Detail('WXSSQ001')">查看</button>
                                <button class="btn btn-danger" onclick="cancel维修申请('WXSSQ001')">撤销</button>
                            </td>
                        </tr>
                        <tr>
                            <td>WXSSQ002</td>
                            <td>招商二号</td>
                            <td>B002</td>
                            <td>紧急维修</td>
                            <td>故障排除</td>
                            <td>2026-03-25 14:00</td>
                            <td>2026-03-25 16:00</td>
                            <td>已通过</td>
                            <td><button class="btn" onclick="view维修申请Detail('WXSSQ002')">查看</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 发起维修申请模态框 -->
        <div id="维修申请Modal" class="modal" style="display: none;">
            <div class="modal-content" style="width: 90%; max-width: 800px;">
                <div class="modal-header">
                    <h4>发起维修申请</h4>
                    <button onclick="close维修申请Modal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>船舶名称：</label>
                            <select>
                                <option>招商一号</option>
                                <option>招商二号</option>
                                <option>招商三号</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>当前泊位：</label>
                            <input type="text" placeholder="系统自动获取" readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>维修类型：</label>
                            <select>
                                <option>常规维修</option>
                                <option>紧急维修</option>
                                <option>定期维护</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>紧急程度：</label>
                            <select>
                                <option>一般</option>
                                <option>紧急</option>
                                <option>非常紧急</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>维修内容：</label>
                        <textarea rows="3" placeholder="请详细描述维修内容"></textarea>
                    </div>
                    <div class="form-group">
                        <label>故障描述：</label>
                        <textarea rows="3" placeholder="请详细描述故障情况"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>计划维修开始时间：</label>
                            <input type="datetime-local" value="2026-03-26T14:00">
                        </div>
                        <div class="form-group">
                            <label>预计维修结束时间：</label>
                            <input type="datetime-local" value="2026-03-26T18:00">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>联系人：</label>
                            <input type="text" placeholder="请输入联系人姓名">
                        </div>
                        <div class="form-group">
                            <label>联系电话：</label>
                            <input type="text" placeholder="请输入联系电话">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>备注：</label>
                        <textarea rows="2" placeholder="请输入备注信息（可选）"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="close维修申请Modal()" class="btn">取消</button>
                    <button onclick="submit维修申请()" class="btn btn-primary">提交申请</button>
                </div>
            </div>
        </div>
    `;
}

// 移泊申请模态框操作函数
function open移泊申请Modal() {
    const modal = document.getElementById('移泊申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('移泊申请Modal');
}
function close移泊申请Modal() {
    document.getElementById('移泊申请Modal').style.display = 'none';
}
function submit移泊申请() {
    alert('移泊申请已提交');
    close移泊申请Modal();
}
function view移泊申请Detail(id) {
    const modal = document.getElementById('移泊申请DetailModal');
    modal.style.display = 'block';
    makeModalDraggable('移泊申请DetailModal');
}
function close移泊申请DetailModal() {
    document.getElementById('移泊申请DetailModal').style.display = 'none';
}
function cancel移泊申请(id) {
    if (confirm('确定要撤销该移泊申请吗？')) {
        alert('移泊申请已撤销');
    }
}

// 排污申请模态框操作函数
function open排污申请Modal() {
    const modal = document.getElementById('排污申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('排污申请Modal');
}
function close排污申请Modal() {
    document.getElementById('排污申请Modal').style.display = 'none';
}
function submit排污申请() {
    alert('排污申请已提交');
    close排污申请Modal();
}
function view排污申请Detail(id) {
    const modal = document.getElementById('排污申请DetailModal');
    modal.style.display = 'block';
    makeModalDraggable('排污申请DetailModal');
}
function close排污申请DetailModal() {
    document.getElementById('排污申请DetailModal').style.display = 'none';
}
function cancel排污申请(id) {
    if (confirm('确定要撤销该排污申请吗？')) {
        alert('排污申请已撤销');
    }
}

// 加油申请模态框操作函数
function open加油申请Modal() {
    const modal = document.getElementById('加油申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('加油申请Modal');
}
function close加油申请Modal() {
    document.getElementById('加油申请Modal').style.display = 'none';
}
function submit加油申请() {
    alert('加油申请已提交');
    close加油申请Modal();
}
function view加油申请Detail(id) {
    const modal = document.getElementById('加油申请DetailModal');
    modal.style.display = 'block';
    makeModalDraggable('加油申请DetailModal');
}
function close加油申请DetailModal() {
    document.getElementById('加油申请DetailModal').style.display = 'none';
}
function cancel加油申请(id) {
    if (confirm('确定要撤销该加油申请吗？')) {
        alert('加油申请已撤销');
    }
}

// 危险作业申请模态框操作函数
function open危险作业申请Modal() {
    const modal = document.getElementById('危险作业申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('危险作业申请Modal');
}
function close危险作业申请Modal() {
    document.getElementById('危险作业申请Modal').style.display = 'none';
}
function submit危险作业申请() {
    alert('危险作业申请已提交');
    close危险作业申请Modal();
}
function view危险作业申请Detail(id) {
    const modal = document.getElementById('危险作业申请DetailModal');
    modal.style.display = 'block';
    makeModalDraggable('危险作业申请DetailModal');
}
function close危险作业申请DetailModal() {
    document.getElementById('危险作业申请DetailModal').style.display = 'none';
}
function cancel危险作业申请(id) {
    if (confirm('确定要撤销该危险作业申请吗？')) {
        alert('危险作业申请已撤销');
    }
}

// 船舶演习申请模态框操作函数
function open船舶演习申请Modal() {
    const modal = document.getElementById('船舶演习申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('船舶演习申请Modal');
}
function close船舶演习申请Modal() {
    document.getElementById('船舶演习申请Modal').style.display = 'none';
}
function submit船舶演习申请() {
    alert('船舶演习申请已提交');
    close船舶演习申请Modal();
}
function view船舶演习申请Detail(id) {
    alert('查看船舶演习申请详情：' + id);
}
function cancel船舶演习申请(id) {
    if (confirm('确定要撤销该船舶演习申请吗？')) {
        alert('船舶演习申请已撤销');
    }
}

// 加水申请模态框操作函数
function open加水申请Modal() {
    const modal = document.getElementById('加水申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('加水申请Modal');
}
function close加水申请Modal() {
    document.getElementById('加水申请Modal').style.display = 'none';
}
function submit加水申请() {
    alert('加水申请已提交');
    close加水申请Modal();
}
function view加水申请Detail(id) {
    alert('查看加水申请详情：' + id);
}
function cancel加水申请(id) {
    if (confirm('确定要撤销该加水申请吗？')) {
        alert('加水申请已撤销');
    }
}

// 供电申请模态框操作函数
function open供电申请Modal() {
    const modal = document.getElementById('供电申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('供电申请Modal');
}
function close供电申请Modal() {
    document.getElementById('供电申请Modal').style.display = 'none';
}
function submit供电申请() {
    alert('供电申请已提交');
    close供电申请Modal();
}
function view供电申请Detail(id) {
    alert('查看供电申请详情：' + id);
}
function cancel供电申请(id) {
    if (confirm('确定要撤销该供电申请吗？')) {
        alert('供电申请已撤销');
    }
}

// 上船培训申请模态框操作函数
function open上船培训申请Modal() {
    const modal = document.getElementById('上船培训申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('上船培训申请Modal');
}
function close上船培训申请Modal() {
    document.getElementById('上船培训申请Modal').style.display = 'none';
}
function submit上船培训申请() {
    alert('上船培训申请已提交');
    close上船培训申请Modal();
}
function view上船培训申请Detail(id) {
    alert('查看上船培训申请详情：' + id);
}
function cancel上船培训申请(id) {
    if (confirm('确定要撤销该上船培训申请吗？')) {
        alert('上船培训申请已撤销');
    }
}

// 维修申请模态框操作函数
function open维修申请Modal() {
    const modal = document.getElementById('维修申请Modal');
    modal.style.display = 'block';
    makeModalDraggable('维修申请Modal');
}
function close维修申请Modal() {
    document.getElementById('维修申请Modal').style.display = 'none';
}
function submit维修申请() {
    alert('维修申请已提交');
    close维修申请Modal();
}
function view维修申请Detail(id) {
    alert('查看维修申请详情：' + id);
}
function cancel维修申请(id) {
    if (confirm('确定要撤销该维修申请吗？')) {
        alert('维修申请已撤销');
    }
}

// 模态框拖拽功能
function makeModalDraggable(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    const modalHeader = modal.querySelector('.modal-header');
    
    if (!modalContent || !modalHeader) return;
    
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    modalHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = parseInt(window.getComputedStyle(modalContent).left) || 0;
        startTop = parseInt(window.getComputedStyle(modalContent).top) || 0;
        modalContent.style.cursor = 'grabbing';
        modalContent.style.position = 'absolute';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        modalContent.style.left = (startLeft + dx) + 'px';
        modalContent.style.top = (startTop + dy) + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            modalContent.style.cursor = 'grab';
        }
    });
}

// 初始化所有模态框的拖拽功能
function initModalDraggable() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        makeModalDraggable(modal.id);
    });
}

// 页面加载完成后初始化拖拽功能
window.addEventListener('DOMContentLoaded', initModalDraggable);

// 邮轮泊位预订内容生成函数
function generate邮轮泊位预订Content() {
    return `
        <div class="page-content">
            <h3>邮轮泊位预订</h3>
            <div class="action-bar">
                <button class="btn btn-primary">新建预订</button>
            </div>
            <div class="filter-section">
                <label>邮轮名称：</label>
                <input type="text" placeholder="请输入邮轮名称">
                <label>泊位编号：</label>
                <select>
                    <option>全部</option>
                    <option>B001</option>
                    <option>B002</option>
                    <option>B003</option>
                    <option>B004</option>
                    <option>B005</option>
                </select>
                <label>预订状态：</label>
                <select>
                    <option>全部</option>
                    <option>待确认</option>
                    <option>已确认</option>
                    <option>已取消</option>
                </select>
                <button class="btn">查询</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>预订编号</th>
                            <th>邮轮名称</th>
                            <th>泊位编号</th>
                            <th>预计到港时间</th>
                            <th>预计离港时间</th>
                            <th>预订状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BOOK001</td>
                            <td>海洋光谱号</td>
                            <td>B001</td>
                            <td>2026-04-01 08:00</td>
                            <td>2026-04-01 16:00</td>
                            <td>待确认</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                                <button class="btn btn-sm btn-danger">取消</button>
                            </td>
                        </tr>
                        <tr>
                            <td>BOOK002</td>
                            <td>海洋量子号</td>
                            <td>B002</td>
                            <td>2026-04-02 09:30</td>
                            <td>2026-04-02 17:30</td>
                            <td>已确认</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>BOOK003</td>
                            <td>海洋绿洲号</td>
                            <td>B003</td>
                            <td>2026-04-03 10:00</td>
                            <td>2026-04-03 18:00</td>
                            <td>已取消</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
}

// 邮轮航班计划管理内容生成函数
function generate邮轮航班计划管理Content() {
    return `
        <div class="page-content">
            <h3>邮轮航班计划管理</h3>
            <div class="action-bar">
                <button class="btn btn-primary">新建计划</button>
                <button class="btn">复制历史计划</button>
                <button class="btn">删除计划</button>
            </div>
            <div class="filter-section">
                <label>计划名称：</label>
                <input type="text" placeholder="请输入计划名称">
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn">查询</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>计划编号</th>
                            <th>计划名称</th>
                            <th>邮轮名称</th>
                            <th>船公司</th>
                            <th>航线</th>
                            <th>开始日期</th>
                            <th>结束日期</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PLAN001</td>
                            <td>2026年4月邮轮航班计划</td>
                            <td>海洋光谱号</td>
                            <td>皇家加勒比</td>
                            <td>深圳-香港-三亚</td>
                            <td>2026-04-01</td>
                            <td>2026-04-30</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn btn-sm">编辑</button>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>PLAN002</td>
                            <td>2026年5月邮轮航班计划</td>
                            <td>海洋量子号</td>
                            <td>皇家加勒比</td>
                            <td>深圳-越南-新加坡</td>
                            <td>2026-05-01</td>
                            <td>2026-05-31</td>
                            <td>已通过</td>
                            <td>
                                <button class="btn btn-sm">编辑</button>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>PLAN003</td>
                            <td>2026年6月邮轮航班计划</td>
                            <td>海洋绿洲号</td>
                            <td>皇家加勒比</td>
                            <td>深圳-日本-韩国</td>
                            <td>2026-06-01</td>
                            <td>2026-06-30</td>
                            <td>已拒绝</td>
                            <td>
                                <button class="btn btn-sm">编辑</button>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
}

// 邮轮动态跟踪内容生成函数
function generate邮轮动态跟踪Content() {
    return `
        <div class="page-content">
            <h3>邮轮动态跟踪</h3>
            <div class="filter-section">
                <label>船舶名称：</label>
                <input type="text" placeholder="请输入船舶名称">
                <label>船公司：</label>
                <select>
                    <option>全部</option>
                    <option>皇家加勒比</option>
                    <option>歌诗达</option>
                    <option>诺唯真</option>
                    <option>公主邮轮</option>
                </select>
                <label>航班状态：</label>
                <select>
                    <option>全部</option>
                    <option>在港</option>
                    <option>离港</option>
                    <option>预计到港</option>
                    <option>延误</option>
                </select>
                <button class="btn">查询</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>航班编号</th>
                            <th>船舶名称</th>
                            <th>船公司</th>
                            <th>抵港时间</th>
                            <th>离港时间</th>
                            <th>停靠港</th>
                            <th>航班状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FLT001</td>
                            <td>海洋光谱号</td>
                            <td>皇家加勒比</td>
                            <td>2026-04-01 08:00</td>
                            <td>2026-04-01 16:00</td>
                            <td>深圳蛇口</td>
                            <td>预计到港</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                                <button class="btn btn-sm">修改作业信息</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FLT002</td>
                            <td>海洋量子号</td>
                            <td>皇家加勒比</td>
                            <td>2026-04-02 09:30</td>
                            <td>2026-04-02 17:30</td>
                            <td>深圳蛇口</td>
                            <td>在港</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                                <button class="btn btn-sm">修改作业信息</button>
                            </td>
                        </tr>
                        <tr>
                            <td>FLT003</td>
                            <td>海洋绿洲号</td>
                            <td>皇家加勒比</td>
                            <td>2026-04-03 10:00</td>
                            <td>2026-04-03 18:00</td>
                            <td>深圳蛇口</td>
                            <td>离港</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
}

// 邮轮信息申请内容生成函数
function generate邮轮信息申请Content() {
    return `
        <div class="page-content">
            <h3>邮轮信息申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary">新建申请</button>
            </div>
            <div class="filter-section">
                <label>申请编号：</label>
                <input type="text" placeholder="请输入申请编号">
                <label>申请类型：</label>
                <select>
                    <option>全部</option>
                    <option>船舶信息</option>
                    <option>船员信息</option>
                    <option>乘客信息</option>
                    <option>货物信息</option>
                </select>
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn">查询</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>申请类型</th>
                            <th>邮轮名称</th>
                            <th>申请时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>INFO001</td>
                            <td>船舶信息</td>
                            <td>海洋光谱号</td>
                            <td>2026-03-20 10:30</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>INFO002</td>
                            <td>船员信息</td>
                            <td>海洋量子号</td>
                            <td>2026-03-19 14:20</td>
                            <td>已通过</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>INFO003</td>
                            <td>乘客信息</td>
                            <td>海洋绿洲号</td>
                            <td>2026-03-18 09:15</td>
                            <td>已拒绝</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
}

// 变更记录查询内容生成函数
function generate变更记录查询Content() {
    return `
        <div class="page-content">
            <h3>变更记录查询</h3>
            <div class="filter-section">
                <label>变更类型：</label>
                <select>
                    <option>全部</option>
                    <option>航班计划变更</option>
                    <option>泊位变更</option>
                    <option>时间变更</option>
                    <option>作业变更</option>
                </select>
                <label>邮轮名称：</label>
                <input type="text" placeholder="请输入邮轮名称">
                <label>变更时间：</label>
                <input type="date">
                <button class="btn">查询</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>变更编号</th>
                            <th>变更类型</th>
                            <th>关联编号</th>
                            <th>邮轮名称</th>
                            <th>变更时间</th>
                            <th>变更人</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CHG001</td>
                            <td>航班计划变更</td>
                            <td>PLAN001</td>
                            <td>海洋光谱号</td>
                            <td>2026-03-20 10:30</td>
                            <td>张三</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>CHG002</td>
                            <td>泊位变更</td>
                            <td>BOOK001</td>
                            <td>海洋量子号</td>
                            <td>2026-03-19 14:20</td>
                            <td>李四</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>CHG003</td>
                            <td>时间变更</td>
                            <td>FLT001</td>
                            <td>海洋绿洲号</td>
                            <td>2026-03-18 09:15</td>
                            <td>王五</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
}

// 无航班作业申请内容生成函数
function generate无航班作业申请Content() {
    return `
        <div class="page-content">
            <h3>无航班作业申请</h3>
            <div class="action-bar">
                <button class="btn btn-primary">新增申请</button>
            </div>
            <div class="filter-section">
                <label>申请编号：</label>
                <input type="text" placeholder="请输入申请编号">
                <label>作业类型：</label>
                <select>
                    <option>全部</option>
                    <option>维修作业</option>
                    <option>补给作业</option>
                    <option>清洁作业</option>
                    <option>其他作业</option>
                </select>
                <label>审核状态：</label>
                <select>
                    <option>全部</option>
                    <option>待审核</option>
                    <option>已通过</option>
                    <option>已拒绝</option>
                </select>
                <button class="btn">查询</button>
            </div>
            <div class="table-section">
                <table>
                    <thead>
                        <tr>
                            <th>申请编号</th>
                            <th>作业类型</th>
                            <th>邮轮名称</th>
                            <th>作业时间</th>
                            <th>审核状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NFLT001</td>
                            <td>维修作业</td>
                            <td>海洋光谱号</td>
                            <td>2026-04-01 08:00</td>
                            <td>待审核</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>NFLT002</td>
                            <td>补给作业</td>
                            <td>海洋量子号</td>
                            <td>2026-04-02 10:00</td>
                            <td>已通过</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                        <tr>
                            <td>NFLT003</td>
                            <td>清洁作业</td>
                            <td>海洋绿洲号</td>
                            <td>2026-04-03 12:00</td>
                            <td>已拒绝</td>
                            <td>
                                <button class="btn btn-sm">查看详情</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
}
