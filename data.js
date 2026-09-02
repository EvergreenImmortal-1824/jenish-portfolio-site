// ============================================================
// PORTFOLIO DATA — data.js
// ============================================================
// This file is the SINGLE SOURCE OF TRUTH for your portfolio.
//
// Normal workflow:
//   1. Edit this file.
//   2. Add/update assets in assets/projects/<project-id>/
//   3. Refresh your browser.
//
// You do NOT need to modify index.html, styles.css, or
// script.js for normal content updates.
// ============================================================

const portfolioData = {

  // ==========================================================
  // PERSONAL INFORMATION
  // ==========================================================
  profile: {
    name: "Jenish Chhowala",
    role: "DevOps & Cloud Engineer",
    tagline:
      "Computer Science graduate building hands-on experience in " +
      "cloud infrastructure, containerization, CI/CD, automation, " +
      "and modern application deployment.",
    location: "",
    about: [
      "I'm a Computer Science graduate focused on DevOps and cloud " +
      "engineering. I've been building hands-on experience across AWS, " +
      "Linux, Docker, Jenkins CI/CD, and GitOps with Kubernetes and Argo CD.",

      "My projects cover the application delivery lifecycle — from source " +
      "control and automated quality checks through security scanning, " +
      "artifact management, containerization, and deployment.",

      "I'm currently extending this foundation into Kubernetes " +
      "orchestration, GitOps workflows, and infrastructure as code " +
      "with Terraform."
    ],
    typingRoles: [
      "DevOps Engineer",
      "Cloud Engineer",
      "AWS Engineer",
      "CI/CD Engineer",
      "Linux Systems Engineer"
    ],
    focusAreas: [
      { icon: "cloud",   label: "Cloud Infrastructure", detail: "AWS"                            },
      { icon: "docker",  label: "Containerization",     detail: "Docker & Kubernetes"            },
      { icon: "cicd",    label: "CI/CD & Automation",   detail: "Jenkins, SonarQube & Trivy"     },
      { icon: "linux",   label: "Linux Systems",        detail: "Linux, Bash & Networking"       }
    ],
    latestCommit: {
      hash: "c8f4a12",
      message: "feat: Jenkins CI & Argo CD GitOps pipeline",
      branch: "main"
    }
  },

  // ==========================================================
  // SOCIAL LINKS & CONTACT
  // REPLACE the placeholder values below with your real details.
  // ==========================================================
  social: {
    github:   "https://github.com/EvergreenImmortal-1824",
    linkedin: "https://www.linkedin.com/in/jenish-chhowala",
    email:    "jenishchhowala@example.com",
    resume:   "assets/resume.pdf"
  },

  // ==========================================================
  // SKILLS
  // Only add skills you have actually worked with.
  // featured: true  — highlighted appearance
  // status: "learning" — shows a "Learning" badge
  // ==========================================================
  skills: [
    {
      id: "cloud",
      label: "Cloud — AWS",
      icon: "cloud",
      tags: [
        { name: "AWS",                     featured: true  },
        { name: "EC2",                     featured: true  },
        { name: "VPC",                     featured: true  },
        { name: "RDS"                                      },
        { name: "Application Load Balancer"                },
        { name: "IAM"                                      },
        { name: "AMI"                                      },
        { name: "Security Groups"                          },
        { name: "Subnets"                                  },
        { name: "Route Tables"                             },
        { name: "Internet Gateway"                         },
        { name: "NAT Gateway"                              },
        { name: "Network ACLs"                             }
      ]
    },
    {
      id: "cicd",
      label: "DevOps & CI/CD",
      icon: "cicd",
      tags: [
        { name: "Jenkins",              featured: true  },
        { name: "CI/CD",               featured: true  },
        { name: "Git",                  featured: true  },
        { name: "GitHub"                                },
        { name: "SonarQube"                             },
        { name: "Quality Gates"                         },
        { name: "Trivy"                                 },
        { name: "Sonatype Nexus"                        },
        { name: "Automated Deployment"                  },
        { name: "Webhooks"                              }
      ]
    },
    {
      id: "containers",
      label: "Containers & Orchestration",
      icon: "docker",
      tags: [
        { name: "Docker",         featured: true  },
        { name: "Docker Compose"                  },
        { name: "Kubernetes",     featured: true  }
      ]
    },
    {
      id: "gitops",
      label: "GitOps",
      icon: "gitops",
      tags: [
        { name: "Argo CD", featured: true  },
        { name: "GitOps"                   }
      ]
    },
    {
      id: "iac",
      label: "Infrastructure as Code",
      icon: "iac",
      tags: [
        { name: "Terraform", status: "learning" }
      ]
    },
    {
      id: "systems",
      label: "Systems & Scripting",
      icon: "linux",
      tags: [
        { name: "Linux",          featured: true  },
        { name: "Bash",           featured: true  },
        { name: "Shell Scripting"                 },
        { name: "Networking"                      },
        { name: "Nginx"                           }
      ]
    }
  ],

  // ==========================================================
  // PROJECTS
  // ──────────────────────────────────────────────────────────
  // To add a new project:
  //   1. Create assets/projects/<id>/
  //   2. Add optional assets
  //   3. Add the object to this array
  //   4. Refresh — no HTML change needed
  //
  // STATUS:   "completed" | "in-progress" | "planned"
  // FEATURED: true | false
  // NULL FIELDS: hide the corresponding UI element
  // ==========================================================
  projects: [

    {
      id: "cloudscale-3tier-engine",
      title: "CloudScale-3Tier-Engine: High-Availability Cloud Architecture & Automated CI/CD Engine",
      status: "completed",
      featured: true,
      category: ["aws", "cloud", "networking", "ci-cd", "devops", "security"],
      shortDescription:
        "Production-grade, highly available 3-Tier web application architecture deployed on AWS and managed via an automated Jenkins CI/CD pipeline with dual ALBs, multi-AZ RDS MySQL redundancy, and shift-left security enforcement.",
      description:
        "Engineered an enterprise-grade 3-Tier architecture across two Availability Zones (us-east-1a, us-east-1b) with six isolated subnets. The presentation tier runs Nginx web instances in private application subnets behind a Public Application Load Balancer, reverse proxying /api/ queries through an Internal ALB to isolated Node.js REST API microservices. The data tier utilizes an Amazon Multi-AZ RDS MySQL cluster with synchronous standby failover and connection pooling. The entire software lifecycle is orchestrated via a Declarative Jenkins CI/CD pipeline featuring SonarQube static code quality gates, Trivy CVE vulnerability scans, Sonatype Nexus artifact storage, and remote private SSH deployments.",
      technologies: [
        "AWS", "VPC", "EC2", "ALB", "Auto Scaling", "RDS MySQL", "Nginx",
        "Node.js", "React 18", "Jenkins", "SonarQube", "Trivy", "Nexus",
        "Route 53", "WAF", "NAT Gateway", "Security Groups"
      ],
      highlights: [
        "Multi-AZ High Availability across us-east-1a & us-east-1b with 6 isolated subnets and explicit route tables",
        "Dual Application Load Balancers: Public ALB for internet ingress & Internal ALB for isolated backend routing",
        "Auto Scaling Groups (ASG) for stateless Nginx web tier and Node.js REST API tier",
        "Amazon Multi-AZ RDS MySQL with synchronous standby replica and mysql2 connection pooling failover",
        "Strict least-privilege Security Group matrix restricting inter-tier traffic by Security Group ID and exact ports",
        "Declarative Jenkins CI/CD pipeline: Git checkout, SonarQube quality gate, Trivy CVE audit, Nexus archiving",
        "Zero-downtime remote private SSH deployment script terminating stale processes and verifying /health endpoints",
        "CloudWatch operational dashboards, ALB 5xx threshold alarms, and AWS Budgets FinOps governance"
      ],
      github: "https://github.com/EvergreenImmortal-1824",
      demo: null,
      architectureDiagram: "assets/projects/aws-3tier/architecture.svg",
      screenshots: [],
      pipeline: {
        type: "CI",
        label: "Jenkins Declarative CI/CD Pipeline",
        stages: [
          { id: "clean",        label: "Clean Workspace",        description: "Cleans up previous build remnants.", status: "completed" },
          { id: "checkout",     label: "Git Checkout",           description: "Clones tracked repository branch using credentials.", status: "completed" },
          { id: "sonarqube",    label: "SonarQube & Gate",       description: "Static code inspection; pipeline aborts on quality failure.", status: "completed" },
          { id: "trivy",        label: "Trivy Security Scan",    description: "Scans filesystem & dependencies for CVEs.", status: "completed" },
          { id: "build-fe",     label: "Frontend Build",         description: "Compiles React 18 production bundle & configures Nginx.", status: "completed" },
          { id: "package-be",   label: "Nexus Packaging",        description: "Compresses backend service & uploads to Sonatype Nexus.", status: "completed" },
          { id: "ssh-deploy",   label: "Private SSH Deploy",     description: "Deploys to private backend EC2 with zero downtime.", status: "completed" },
          { id: "health-alert", label: "Health & Notification",  description: "Verifies /health probe & sends Discord/Teams webhook alert.", status: "completed" }
        ]
      },
      deployment: {
        type: "CD",
        label: "Multi-AZ 3-Tier Traffic Flow",
        stages: [
          { id: "edge",   label: "Route 53 + WAF",     description: "DNS resolution and application firewall DDoS protection." },
          { id: "pubalb", label: "Public ALB (80)",    description: "Ingests public web requests across public subnets." },
          { id: "nginx",  label: "Nginx Web (ASG)",    description: "Serves React SPA assets & reverse proxies /api/ requests." },
          { id: "intalb", label: "Internal ALB",       description: "Forwards API traffic to private Node.js backend nodes." },
          { id: "nodejs", label: "Node.js API",        description: "Processes business logic & REST endpoints on port 4000." },
          { id: "rds",    label: "RDS MySQL Multi-AZ", description: "Primary transactional storage node with synchronous standby." }
        ]
      },
      notes: "Production-grade enterprise isolation where backend compute and data layers have zero direct internet access."
    },

    {
      id: "springboot-rest-api",
      title: "Full Stack Spring Boot REST API Architecture",
      status: "completed",
      featured: true,
      category: ["docker", "ci-cd", "infrastructure-as-code", "devops"],
      shortDescription:
        "Containerized full-stack API architecture featuring Spring Boot 3.2 (Java 21), Swagger UI OpenAPI 3, PostgreSQL 16, React 18 SPA, automated via Jenkins CI/CD pipeline and Terraform Infrastructure as Code (IaC).",
      description:
        "Engineered a production-ready containerized full-stack architecture combining a Spring Boot 3.2 REST API on Java 21 with a modern React 18 Single Page Application. Persistence is managed via PostgreSQL 16 with named Docker volume mapping and Spring Data JPA / Hibernate ORM. Features automated OpenAPI 3 interactive Swagger UI documentation at /swagger-ui.html, Actuator health monitoring probes, WebMvcConfigurer CORS security filtering with preflight caching, multi-stage container orchestration via Docker Compose, a declarative Jenkins CI pipeline for automated testing and container publishing, and Terraform IaC configuration for repeatable cloud provisioning.",
      technologies: [
        "Spring Boot 3", "Java 21", "React 18", "Docker", "Docker Compose",
        "PostgreSQL 16", "Swagger / OpenAPI", "Spring Data JPA", "Hibernate",
        "Jenkins", "Terraform", "CI/CD", "IaC", "Nginx", "Vite", "REST API"
      ],
      highlights: [
        "Spring Boot 3.2 backend built with modern Java 21 LTS, Spring Data JPA, and Hibernate ORM",
        "Multi-container Docker & Docker Compose orchestration with automated health check readiness dependencies",
        "Interactive Swagger UI (OpenAPI 3) live documentation and API testing dashboard at /swagger-ui.html",
        "PostgreSQL 16 relational store with persistent named Docker volume and transactional schema integrity",
        "React 18 Single Page Application with Vite, responsive glassmorphism UI, live health monitor, and CRUD dashboard",
        "WebMvcConfigurer CORS security filter with allowed origins, methods, and 1-hour preflight caching",
        "Automated via Jenkins CI pipeline executing unit tests, code verification, and Docker registry publishing",
        "Terraform Infrastructure as Code (IaC) templates for automated cloud environment provisioning"
      ],
      github: "https://github.com/EvergreenImmortal-1824",
      demo: null,
      architectureDiagram: "assets/projects/springboot-docker/architecture.svg",
      screenshots: [],
      pipeline: {
        type: "CI",
        label: "Jenkins CI Pipeline (Spring Boot + React)",
        stages: [
          { id: "checkout", label: "Git Checkout",       description: "Clones tracked repository branch from GitHub.", status: "completed" },
          { id: "build",    label: "Maven Build & Test", description: "Compiles Java 21 and runs Spring Boot unit tests.", status: "completed" },
          { id: "fe-build", label: "Vite React Build",   description: "Compiles React 18 SPA production bundle.", status: "completed" },
          { id: "compose",  label: "Docker Compose",     description: "Builds multi-container images with health checks.", status: "completed" },
          { id: "push",     label: "Registry Push",      description: "Pushes verified images to container registry.", status: "completed" }
        ]
      },
      deployment: {
        type: "CD",
        label: "Terraform IaC & Container Flow",
        stages: [
          { id: "terraform", label: "Terraform IaC",          description: "Provisions cloud VPC, security groups, and storage." },
          { id: "browser",   label: "React SPA (Port 3000)",  description: "Client browser interacting with Vite/Nginx frontend." },
          { id: "cors",      label: "CORS Security Filter",    description: "Validates allowed origins, HTTP methods & preflight cache." },
          { id: "api",       label: "Spring Boot 3 (Port 8080)", description: "REST controllers, JPA repositories, Actuator & Swagger UI." },
          { id: "postgres", label: "PostgreSQL 16 (Port 5432)", description: "Relational persistence with Docker persistent volume pgdata." }
        ]
      },
      notes: "Configured with both Docker Compose multi-container execution and Jenkins CI & Terraform IaC automation."
    },

    {
      id: "ecommerce-microservices",
      title: "Dockerized E-Commerce Microservices & React SPA Platform",
      status: "completed",
      featured: true,
      category: ["docker", "microservices", "ci-cd", "infrastructure-as-code", "devops"],
      shortDescription:
        "Full-stack microservices e-commerce platform featuring Nginx API Gateway, independent Auth, Product, and Order services with isolated MySQL schemas, containerized with Docker and automated via Jenkins CI/CD & Terraform.",
      description:
        "Architected a containerized microservices e-commerce platform built on Node.js, Express, MySQL, JWT authentication, and a modern React SPA frontend. Features an Nginx API Gateway reverse proxying traffic on Port 8080 to three decoupled microservices: Auth Service (Port 5001, bcryptjs, JWT), Product Catalog Service (Port 5002, search, filtering, sorting), and Order Service (Port 5003, ACID transactional order creation). Database layer maintains schema isolation (auth_db, catalog_db, order_db) on MySQL with Docker volume persistence. Automated with a Jenkins CI/CD pipeline and Terraform Infrastructure as Code (IaC) configuration.",
      technologies: [
        "Docker", "Docker Compose", "Microservices", "Node.js", "Express",
        "React", "MySQL", "Nginx", "JWT", "Jenkins", "Terraform", "CI/CD", "IaC"
      ],
      highlights: [
        "Decoupled microservices architecture: Nginx Gateway (:8080), Auth (:5001), Product (:5002), and Order (:5003)",
        "Database schema isolation: Dedicated auth_db, catalog_db, and order_db on MySQL 3306 with persistent volume",
        "Secure JWT authentication with bcryptjs password hashing and role-based customer/admin access control",
        "Order processing engine using database transactions (ACID) to ensure atomic order and line-item creation",
        "Modern React SPA frontend with live category filtering, search, dynamic sorting, and cart checkout",
        "Multi-container Docker Compose orchestration (docker compose up --build) with single-command deployment",
        "Jenkins CI/CD automation pipeline validating microservice unit tests, linting, and Docker container publishing",
        "Terraform Infrastructure as Code (IaC) scripts defining cloud infrastructure, networking, and container environments"
      ],
      github: "https://github.com/EvergreenImmortal-1824",
      demo: null,
      architectureDiagram: "assets/projects/ecommerce-microservices/architecture.svg",
      screenshots: [],
      pipeline: {
        type: "CI",
        label: "Jenkins Microservices CI Pipeline",
        stages: [
          { id: "checkout", label: "Git Checkout",        description: "Pull repository branch across all microservices.", status: "completed" },
          { id: "test-svc", label: "Service Test Suite",  description: "Runs unit & integration tests for Auth, Product & Order.", status: "completed" },
          { id: "build-fe", label: "React SPA Build",     description: "Compiles React production bundle with Vite.", status: "completed" },
          { id: "docker",   label: "Docker Compose Build", description: "Builds Nginx, Auth, Product, Order & MySQL images.", status: "completed" },
          { id: "push",     label: "Registry Publishing", description: "Publishes versioned microservice images to container registry.", status: "completed" }
        ]
      },
      deployment: {
        type: "CD",
        label: "Terraform IaC & Microservices Flow",
        stages: [
          { id: "terraform", label: "Terraform IaC",           description: "Provisions cloud VPC, security groups, and compute." },
          { id: "gateway",   label: "Nginx Gateway (Port 8080)", description: "Serves React SPA & dynamic path routing (/api/*)." },
          { id: "auth",      label: "Auth Service (:5001)",    description: "JWT authentication, bcryptjs & auth_db schema." },
          { id: "product",   label: "Product Service (:5002)", description: "Catalog, search, category filter & catalog_db." },
          { id: "order",     label: "Order Service (:5003)",   description: "ACID transactions, order history & order_db." },
          { id: "mysql",     label: "MySQL Cluster (:3306)",   description: "Multi-schema isolated persistence with Docker volume." }
        ]
      },
      notes: "Fully containerized microservice boundaries with zero database state leakage across service domains."
    },

    {
      id: "cash-management-system",
      title: "Cash Management System (CMS): Enterprise Financial Microservices Engine",
      status: "completed",
      featured: true,
      category: ["docker", "microservices", "ci-cd", "infrastructure-as-code", "devops"],
      shortDescription:
        "Enterprise financial cash management system featuring 6 containerized microservices, aggregated health monitoring, lightweight service orchestrator, automated via Jenkins CI/CD and Terraform IaC.",
      description:
        "Engineered an enterprise financial Cash Management System (CMS) designed for high-availability treasury operations. Comprises an API Gateway and Dashboard UI (Port 5000) orchestrating 5 dedicated financial microservices: Auth Service (Port 5001), Account Master Service (Port 5002), Transaction Engine (Port 5003), Analytics Service (Port 5004), and Reconciliation Service (Port 5005). Utilizes a custom start-services.js orchestrator for lightweight container execution, aggregated /health monitoring, and centralized logging. Automated with a Jenkins CI/CD pipeline and Terraform Infrastructure as Code (IaC) scripts for cloud deployment.",
      technologies: [
        "Docker", "Docker Compose", "Microservices", "Node.js", "Express",
        "REST APIs", "Jenkins", "Terraform", "CI/CD", "IaC", "Bash"
      ],
      highlights: [
        "6-tier financial microservices platform: API Gateway (:5000), Auth (:5001), Account (:5002), Transaction (:5003), Analytics (:5004), Reconciliation (:5005)",
        "Single-container lightweight service orchestrator (start-services.js) or multi-container Docker Compose deployment",
        "Aggregated system health endpoint (curl /health) querying health across all 5 financial microservice daemons",
        "Real-time cash flow analytics and automated settlement reconciliation engine",
        "Centralized Docker logging (docker compose logs -f) and graceful process termination handling",
        "Jenkins CI/CD pipeline automating multi-service build verification, integration tests, and container packaging",
        "Terraform IaC modules provisioning cloud infrastructure, security groups, and production compute targets"
      ],
      github: "https://github.com/EvergreenImmortal-1824",
      demo: null,
      architectureDiagram: "assets/projects/cash-management-system/architecture.svg",
      screenshots: [],
      pipeline: {
        type: "CI",
        label: "Jenkins CI Pipeline (Financial Engine)",
        stages: [
          { id: "checkout", label: "Git Checkout",        description: "Pull repository branch for CMS orchestrator & services.", status: "completed" },
          { id: "lint",     label: "Dependency Audit",    description: "Audit npm dependencies & run static linting checks.", status: "completed" },
          { id: "test",     label: "Service Test Suite",  description: "Validate transaction ledger & reconciliation algorithms.", status: "completed" },
          { id: "docker",   label: "Docker Image Build",  description: "Build lightweight container with start-services.js.", status: "completed" },
          { id: "publish",  label: "Registry Publishing", description: "Push verified container images to image registry.", status: "completed" }
        ]
      },
      deployment: {
        type: "CD",
        label: "Terraform IaC & Microservices Topology",
        stages: [
          { id: "terraform", label: "Terraform IaC",           description: "Provisions cloud infrastructure & network security groups." },
          { id: "gateway",   label: "API Gateway (:5000)",     description: "Dashboard UI, dynamic route proxy & aggregated /health." },
          { id: "auth-acct", label: "Auth & Account Services", description: "Identity, permissions, and account masters (:5001, :5002)." },
          { id: "tx-analyt", label: "Transaction & Analytics", description: "Financial ledger processing & cash flow metrics (:5003, :5004)." },
          { id: "reconcil",  label: "Reconciliation (:5005)",  description: "Automated balance auditing & settlement verification." }
        ]
      },
      notes: "Single-command containerized deployment (docker compose up -d) with aggregated health monitoring."
    }

  ],

  // ==========================================================
  // CERTIFICATIONS
  // Empty = section hidden. Add certs here when you have them.
  // Example entry:
  // { name: "AWS Certified ...", issuer: "Amazon Web Services",
  //   date: "2027", credentialUrl: "https://...", icon: "cloud" }
  // ==========================================================
  certifications: [],

  // ==========================================================
  // SITE METADATA (SEO, Open Graph, Twitter Cards)
  // ==========================================================
  meta: {
    siteTitle:    "Jenish Chhowala — DevOps & Cloud Engineer",
    description:
      "Portfolio of Jenish Chhowala, a Computer Science graduate building " +
      "hands-on DevOps and cloud engineering experience across AWS, Linux, " +
      "Docker, Jenkins, Kubernetes, and GitOps.",
    author:       "Jenish Chhowala",
    canonicalUrl: "",          // REPLACE: "https://your-domain.com"
    ogImage:      "",          // REPLACE: "assets/og-image.png"
    twitterHandle: "",         // REPLACE: "@yourhandle"
    siteLanguage:  "en"
  }
};


