document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');
    const navLinksList = document.querySelectorAll('.nav-link');

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Close menu when links are clicked
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       SCROLL EFFECTS: STICKY HEADER & SCROLL SPY
       ========================================================================== */
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header scroll styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Spy active navigation state
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    /* ==========================================================================
       SCROLL-ANIMATION AND COUNT-UP OBSERVERS
       ========================================================================== */
    // Fade-in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in-element');
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => animationObserver.observe(el));





    /* ==========================================================================
       MODAL HANDLING SYSTEM
       ========================================================================== */
    let lastFocusedElement = null;

    const openModal = (modalEl) => {
        if (!modalEl) return;
        lastFocusedElement = document.activeElement;
        modalEl.classList.add('active');
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus first interactive element (close button)
        const closeBtn = modalEl.querySelector('.modal-close, .btn-close-dialog');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 50);
        }
    };

    const closeModal = (modalEl) => {
        if (!modalEl) return;
        modalEl.classList.remove('active');
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Restore focus to trigger
        if (lastFocusedElement) {
            setTimeout(() => lastFocusedElement.focus(), 50);
            lastFocusedElement = null;
        }
    };

    const setupModalCloseEvents = (modalEl, closeBtnEl, backdropEl) => {
        if (closeBtnEl) {
            closeBtnEl.addEventListener('click', () => closeModal(modalEl));
        }
        if (backdropEl) {
            backdropEl.addEventListener('click', () => closeModal(modalEl));
        }
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalEl.classList.contains('active')) {
                closeModal(modalEl);
            }
        });
    };

    /* ==========================================================================
       CERTIFICATIONS: Now using direct Google Drive links (target="_blank")
       No modal JS needed — each "View Certificate" is an <a> tag.
       ========================================================================== */


    /* ==========================================================================
       PROJECT DETAIL DIALOGS & CODE SNIPPETS (2 projects)
       ========================================================================== */
    const projectModal = document.getElementById('projectModal');
    const projectClose = document.getElementById('projectModalClose');
    const projectBackdrop = document.getElementById('projectModalBackdrop');
    const projectDetailButtons = document.querySelectorAll('.project-detail-btn');
    const projectCardTriggers = document.querySelectorAll('.project-card .project-img-wrapper');
    
    const pmHeadline = document.getElementById('projectModalHeadline');
    const pmCat = document.getElementById('projectModalCat');
    const pmDesc = document.getElementById('projectModalDesc');
    const pmTechText = document.getElementById('projectModalTechText');
    const pmCode = document.getElementById('projectModalCode');
    const pmInsightsList = document.getElementById('projectModalInsightsList');
    const pmToolsList = document.getElementById('projectModalToolsList');
    const pmImg = document.getElementById('projectModalImg');
    const pmStat1 = document.getElementById('projStat1');
    const pmStat2 = document.getElementById('projStat2');
    const pmStatLabel1 = document.getElementById('projStatLabel1');
    const pmStatLabel2 = document.getElementById('projStatLabel2');
    const pmCodeLangLabel = document.getElementById('codeLangLabel');

    setupModalCloseEvents(projectModal, projectClose, projectBackdrop);

    const projectDatabase = {
        'task-tracker': {
            category: 'Automation & Productivity',
            headline: 'Smart Task Tracker',
            image: 'assets/images/project1.png',
            stat1: '50+',
            statLabel1: 'Tasks Tracked',
            stat2: '10+',
            statLabel2: 'Automated Workflows',
            description: 'A centralized task management solution built using SharePoint, Excel Dashboards, and Power Automate. The system enables teams to assign, monitor, and complete tasks with full visibility into bottlenecks, deadlines, and productivity metrics. Automated reminders trigger via Power Automate flows, ensuring nothing falls through the cracks.',
            techDetails: 'SharePoint lists serve as the backend data store for task records. Excel dashboards connect via Power Query to pull live data and render status charts, completion funnels, and assignment breakdowns. Power Automate flows handle email notifications, deadline escalations, and status change triggers.',
            codeLang: 'Power Automate Flow (Pseudo)',
            codeSnippet: `// Power Automate Trigger: When a SharePoint item is modified
Trigger: "When an item is created or modified"
  → Condition: Status equals "Overdue"
    → Yes:
        → Send Email Notification
          To: AssignedTo.Email
          Subject: "⚠️ Task Overdue: [TaskTitle]"
          Body: "Your task '[TaskTitle]' was due on [DueDate].
                 Please update or complete it immediately."
        → Update SharePoint Item
          Set EscalationFlag = true
    → No:
        → Terminate (Do Nothing)`,
            insights: [
                'Reduced manual status-check meetings by 60% through automated daily digest emails to project managers.',
                'Task completion rates improved by 25% after implementing automated overdue escalation alerts.',
                'Dashboard reporting enabled leadership to identify resource bottlenecks across 5 parallel project streams.',
                'Integration with SharePoint eliminated data duplication across spreadsheets used by 3 different teams.'
            ],
            tools: ['Excel', 'SharePoint', 'Power Automate', 'Dashboard Reporting', 'Productivity Analytics']
        },
        'ai-assistant': {
            category: 'Data Science & AI',
            headline: 'AI Business Decision Assistant',
            image: 'assets/images/project2.png',
            stat1: '5+',
            statLabel1: 'KPI Modules',
            stat2: '3',
            statLabel2: 'Export Formats',
            description: 'An AI-powered business analytics platform designed to provide intelligent insights from sales, customer, and business data. The application ingests operational datasets, calculates KPIs, and uses OpenAI API to generate natural language summaries and recommendations. Users interact through a clean web dashboard with dynamic filtering, PDF reporting, and Excel exports.',
            techDetails: 'Built with a Python Flask backend connecting to a MySQL database. Pandas handles data transformation, aggregation, and KPI computation. The front end uses HTML, CSS, and JavaScript to render interactive charts. OpenAI API generates contextual business intelligence summaries based on current dataset metrics.',
            codeLang: 'Python / Flask',
            codeSnippet: `# Flask route for generating AI-powered business insights
@app.route('/api/insights', methods=['POST'])
def generate_insights():
    filters = request.json
    
    # Query MySQL database with dynamic filters
    query = build_dynamic_query(filters)
    df = pd.read_sql(query, db_connection)
    
    # Calculate core KPIs
    kpis = {
        'total_revenue': df['revenue'].sum(),
        'avg_order_value': df['revenue'].mean(),
        'customer_count': df['customer_id'].nunique(),
        'growth_rate': calculate_growth(df)
    }
    
    # Generate AI summary using OpenAI API
    prompt = f"""Analyze these business KPIs and provide
    3 actionable recommendations: {json.dumps(kpis)}"""
    
    ai_response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return jsonify({
        'kpis': kpis,
        'ai_summary': ai_response.choices[0].message.content,
        'chart_data': df.to_dict(orient='records')
    })`,
            insights: [
                'AI-generated summaries reduced manual report writing time from 2 hours to under 5 minutes per cycle.',
                'Dynamic filtering enabled stakeholders to drill into regional, product-level, and temporal KPI views instantly.',
                'PDF and Excel export features allowed offline review and board-level distribution of analytics packages.',
                'Natural language insights helped non-technical managers understand complex revenue and churn patterns.'
            ],
            tools: ['Python', 'Flask', 'MySQL', 'Pandas', 'OpenAI API', 'HTML', 'CSS', 'JavaScript']
        },
        'mini-sql-engine': {
            category: 'Data Engineering & Databases',
            headline: 'Mini SQL Engine',
            image: 'assets/images/project3.png',
            stat1: '8+',
            statLabel1: 'Key Features',
            stat2: '100%',
            statLabel2: 'Pure Python',
            description: 'A simplified SQL query processor built in Python that demonstrates how SQL queries are parsed and executed internally without using a database management system. It parses SQL-like queries, loads CSV datasets dynamically into memory, and performs filtering, selection, and aggregation operations.',
            techDetails: 'Developed using standard Python libraries to model DBMS internals. Implements file I/O using the built-in CSV module, structured data representations via Python lists and dictionaries, and a command-line interface (CLI) for parsing and executing SELECT-WHERE queries with COUNT(*) support.',
            codeLang: 'Python',
            codeSnippet: `def execute_query(query_str, database):
    # Basic SQL Query Parser (SELECT col FROM table WHERE col = val)
    tokens = query_str.strip().split()
    try:
        select_idx = tokens.index("SELECT")
        from_idx = tokens.index("FROM")
        
        # Parse columns
        cols = [c.strip(",") for c in tokens[select_idx+1:from_idx]]
        
        # Parse table name
        if "WHERE" in tokens:
            where_idx = tokens.index("WHERE")
            table_name = tokens[from_idx+1:where_idx][0]
            where_clause = tokens[where_idx+1:]
        else:
            table_name = tokens[from_idx+1:][0]
            where_clause = None
            
        # Load table data
        table_data = database.get(table_name)
        if not table_data:
            raise ValueError(f"Table '{table_name}' not found.")
            
        # Execute Selection & Filtering
        results = []
        for row in table_data:
            if where_clause:
                col, op, val = where_clause[0], where_clause[1], where_clause[2].strip("'\"")
                if row.get(col) != val:
                    continue
            
            # Project fields
            if cols == ["*"] or cols == ["COUNT(*)"]:
                results.append(row)
            else:
                results.append({k: row[k] for k in cols if k in row})
                
        if cols == ["COUNT(*)"]:
            return [{"COUNT(*)": len(results)}]
            
        return results
    except Exception as e:
        return {"Error": f"Query Execution Failed: {str(e)}"}`.trim(),
            insights: [
                'Demonstrates how structured query parsing maps user-input strings into relational execution plans.',
                'Loads and indexes CSV files dynamically, mapping flat-file records into structured list-of-dictionary formats in memory.',
                'Implements basic SELECT projections, WHERE filter execution, and COUNT(*) group aggregation routines.',
                'Includes custom exception boundaries and error handling blocks to prevent execution failures during invalid syntax parses.'
            ],
            tools: ['Python', 'SQL Concepts', 'CSV Module', 'Dictionaries', 'Lists', 'CLI']
        },
        'customer-churn-analytics': {
            category: 'Power BI & Data Analytics',
            headline: 'Customer Churn Analytics Dashboard',
            image: 'assets/images/project4.png',
            stat1: '3+',
            statLabel1: 'Report Pages',
            stat2: '15+',
            statLabel2: 'DAX Measures',
            description: 'Developed an interactive Power BI dashboard to analyze customer churn patterns, retention metrics, customer segmentation, and business insights. Enabled data-driven decision-making through KPI tracking and visual analytics.',
            techDetails: 'The dashboard is built on an Excel dataset. Data cleansing and transformation were performed in Power Query. Designed a star schema data model with relations between fact tables and dimension tables. Implemented complex DAX measures for calculating active users, monthly churn rates, customer lifetime value, and cohort analysis.',
            codeLang: 'DAX Measure',
            codeSnippet: `Churn Rate = 
VAR ChurnedCustomers = 
    CALCULATE(
        COUNT(Customers[CustomerID]),
        Customers[Status] = "Churned"
    )
VAR TotalCustomers = 
    COUNT(Customers[CustomerID])
RETURN
    DIVIDE(ChurnedCustomers, TotalCustomers, 0)`,
            insights: [
                'Identified key churn drivers, indicating that customers with month-to-month contracts had a 40% higher churn probability.',
                'Segmented customers by tenure and billing method, discovering high risk in the initial 3 months of subscription.',
                'Implemented retention tracking KPIs that allow managers to monitor churn variance week-over-week.',
                'Developed predictive metrics using historical behavior to highlight customers with high likelihood of leaving.'
            ],
            tools: ['Power BI', 'Excel', 'Data Modeling', 'DAX', 'Data Visualization']
        },
        'employee-statistics': {
            category: 'Power BI & HR Analytics',
            headline: 'Employee Statistics Dashboard',
            image: 'assets/images/project5.png',
            stat1: '5+',
            statLabel1: 'HR Metrics',
            stat2: '100%',
            statLabel2: 'Interactive',
            description: 'Built a Power BI dashboard to analyze employee performance, workforce distribution, department statistics, and key HR metrics. Provided actionable insights through interactive visualizations and reporting.',
            techDetails: 'Designed a comprehensive HR database representation. Implemented automated data pipelines from Excel logs, and calculated metrics for employee turnover, performance ratings, and diversity indicators. Designed custom tooltips and slicers for drilling down by department, gender, and job roles.',
            codeLang: 'DAX Measure',
            codeSnippet: `Turnover Rate = 
VAR TerminatedCount = 
    CALCULATE(
        COUNT(Employees[EmployeeID]),
        Employees[Status] = "Terminated"
    )
VAR ActiveCount = 
    CALCULATE(
        COUNT(Employees[EmployeeID]),
        Employees[Status] = "Active"
    )
RETURN
    DIVIDE(TerminatedCount, ActiveCount, 0)`,
            insights: [
                'Provided clear insights into workforce distribution, indicating a 12% annual employee turnover rate in technical departments.',
                'Enabled HR leadership to evaluate employee performance scores across departments, identifying top performers and training gaps.',
                'Highlighted key hiring trends and headcount growth projections, assisting in budget planning for the upcoming fiscal year.',
                'Designed gender and demographics distribution analytics to support organizational diversity and inclusion initiatives.',
            ],
            tools: ['Power BI', 'Excel', 'HR Analytics', 'DAX', 'Data Visualization']
        }
    };

    const loadProjectModal = (projId) => {
        const details = projectDatabase[projId];
        if (!details) return;

        pmHeadline.textContent = details.headline;
        pmCat.textContent = details.category;
        pmImg.src = details.image;
        pmImg.alt = details.headline;
        pmStat1.textContent = details.stat1;
        pmStatLabel1.textContent = details.statLabel1;
        pmStat2.textContent = details.stat2;
        pmStatLabel2.textContent = details.statLabel2;
        
        pmDesc.textContent = details.description;
        pmTechText.textContent = details.techDetails;
        pmCodeLangLabel.textContent = details.codeLang;
        pmCode.textContent = details.codeSnippet;

        pmInsightsList.innerHTML = '';
        details.insights.forEach(insight => {
            const li = document.createElement('li');
            li.textContent = insight;
            pmInsightsList.appendChild(li);
        });

        pmToolsList.innerHTML = '';
        details.tools.forEach(tool => {
            const span = document.createElement('span');
            span.textContent = tool;
            pmToolsList.appendChild(span);
        });

        // Default back to first tab (Summary)
        const tabs = document.querySelectorAll('.project-modal-info .btn-tab');
        const contents = document.querySelectorAll('.project-modal-info .project-tab-content');
        
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tabs[0].classList.add('active');
        document.getElementById('tabContentSummary').classList.add('active');

        openModal(projectModal);
    };

    projectDetailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.project-card');
            const id = card.getAttribute('data-project-id');
            loadProjectModal(id);
        });
    });

    projectCardTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const card = trigger.closest('.project-card');
            const id = card.getAttribute('data-project-id');
            loadProjectModal(id);
        });
    });

    // Handle internal project modal tab switching
    const modalTabNav = document.getElementById('projectTabNav');
    if (modalTabNav) {
        const tabButtons = modalTabNav.querySelectorAll('.btn-tab');
        const tabContents = document.querySelectorAll('.project-modal-info .project-tab-content');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const tabKey = btn.getAttribute('data-tab');
                
                if (tabKey === 'summary') document.getElementById('tabContentSummary').classList.add('active');
                if (tabKey === 'tech') document.getElementById('tabContentTech').classList.add('active');
                if (tabKey === 'insights') document.getElementById('tabContentInsights').classList.add('active');
            });
        });
    }

    // Code snippet copy-to-clipboard action
    const btnCopyCode = document.getElementById('btnCopyCode');
    if (btnCopyCode) {
        btnCopyCode.addEventListener('click', () => {
            const codeText = pmCode.textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                btnCopyCode.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981"></i> Copied!';
                setTimeout(() => {
                    btnCopyCode.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Code';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }


    /* ==========================================================================
       CONTACT FORM VALIDATION & MODAL SUCCESS DIALOG
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const successCloseBtn = document.getElementById('btnSuccessClose');
    const successBackdrop = document.getElementById('successModalBackdrop');

    setupModalCloseEvents(successModal, successCloseBtn, successBackdrop);
    const formFields = {
        name: {
            el: document.getElementById('formName'),
            err: document.getElementById('nameError'),
            validate: (val) => val.trim().length > 0
        },
        email: {
            el: document.getElementById('formEmail'),
            err: document.getElementById('emailError'),
            validate: (val) => {
                const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return re.test(val.trim());
            }
        },
        subject: {
            el: document.getElementById('formSubject'),
            err: document.getElementById('subjectError'),
            validate: (val) => val.trim().length > 0
        },
        message: {
            el: document.getElementById('formMessage'),
            err: document.getElementById('messageError'),
            validate: (val) => val.trim().length > 0
        }
    };

    const formStatusMsg = document.getElementById('formStatusMsg');

    const showFormStatus = (text, type) => {
        if (!formStatusMsg) return;
        formStatusMsg.textContent = text;
        formStatusMsg.className = `form-status-msg ${type}`;
        formStatusMsg.classList.remove('hidden');
    };

    const hideFormStatus = () => {
        if (!formStatusMsg) return;
        formStatusMsg.className = 'form-status-msg hidden';
        formStatusMsg.textContent = '';
    };

    // Real-time input checking
    Object.keys(formFields).forEach(key => {
        const field = formFields[key];
        field.el.addEventListener('input', () => {
            if (field.validate(field.el.value)) {
                field.el.classList.remove('invalid');
                field.err.style.display = 'none';
            }
            hideFormStatus();
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;
            hideFormStatus();

            Object.keys(formFields).forEach(key => {
                const field = formFields[key];
                if (!field.validate(field.el.value)) {
                    field.el.classList.add('invalid');
                    field.err.style.display = 'block';
                    isFormValid = false;
                } else {
                    field.el.classList.remove('invalid');
                    field.err.style.display = 'none';
                }
            });

            if (isFormValid) {
                const submitBtn = document.getElementById('btnSubmitForm');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnSpinner = submitBtn.querySelector('.btn-spinner');

                submitBtn.disabled = true;
                btnText.classList.add('hidden');
                btnSpinner.classList.remove('hidden');

                const action = contactForm.getAttribute('action');
                if (action && action.trim() !== '') {
                    // Formspree HTTP POST Submission
                    const formData = new FormData(contactForm);
                    fetch(action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        return response.json()
                            .catch(() => ({ error: `Submission failed (${response.status})` }))
                            .then(data => {
                                console.log("Formspree Response:", data);
                                if (response.ok) {
                                    return data;
                                } else {
                                    const errorMsg = data.errors
                                        ? data.errors.map(e => e.message).join(', ')
                                        : (data.error || `Submission failed (${response.status})`);
                                    throw new Error(errorMsg);
                                }
                            });
                    })
                    .then(data => {
                        contactForm.reset();
                        openModal(successModal);
                        showFormStatus('Message sent successfully!', 'success');
                    })
                    .catch(err => {
                        console.error('Form submission error:', err);
                        showFormStatus(`Failed to send message: ${err.message}`, 'error');
                    })
                    .finally(() => {
                        submitBtn.disabled = false;
                        btnText.classList.remove('hidden');
                        btnSpinner.classList.add('hidden');
                    });
                }
            }
        });
    }
    /* ==========================================================================
       PROJECT CATEGORY FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProjectCards = document.querySelectorAll('.projects-grid .project-card');

    if (filterButtons.length > 0 && allProjectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active tab styling
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                allProjectCards.forEach(card => {
                    const categories = (card.getAttribute('data-category') || '').split(' ');
                    const shouldShow = (filterValue === 'all') || categories.includes(filterValue);

                    if (shouldShow) {
                        if (card.style.display === 'none') {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(15px)';
                            card.style.display = '';
                            
                            // Force reflow
                            card.offsetHeight;
                            
                            // Clear inline styles so CSS transitions handle fade-in and hover transitions function
                            requestAnimationFrame(() => {
                                card.style.opacity = '';
                                card.style.transform = '';
                            });
                        } else {
                            card.style.opacity = '';
                            card.style.transform = '';
                        }
                    } else {
                        // Fade out, then hide
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            // Ensure the card hasn't been re-shown in the meantime
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }
});
