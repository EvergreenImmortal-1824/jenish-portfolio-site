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
    ]
  },

  // ==========================================================
  // SOCIAL LINKS & CONTACT
  // REPLACE the placeholder values below with your real details.
  // ==========================================================
  social: {
    github:   "https://github.com/YOUR_USERNAME",           // REPLACE
    linkedin: "https://www.linkedin.com/in/YOUR_HANDLE/",  // REPLACE
    email:    "your.email@example.com",                     // REPLACE
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
        { name: "Networking"                      }
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
      id: "aws-3tier",
      title: "AWS 3-Tier Application Architecture",
      status: "completed",
      featured: true,
      category: ["aws", "cloud", "networking"],
      shortDescription:
        "Designed and deployed a 3-tier application architecture on AWS " +
        "using a custom VPC with network isolation across web, application, " +
        "and database tiers.",
      description:
        "Built a hands-on 3-tier AWS architecture using a custom VPC with " +
        "six subnets distributed across availability zones. The architecture " +
        "separates public (web), private (application), and data (database) " +
        "tiers. Routing, security groups, an Application Load Balancer, EC2 " +
        "instances, and Amazon RDS are configured to create an isolated, " +
        "layered application environment.",
      technologies: [
        "AWS", "VPC", "EC2", "RDS", "Application Load Balancer",
        "IAM", "AMI", "Security Groups", "Subnets", "Route Tables",
        "Internet Gateway", "NAT Gateway", "Network ACLs"
      ],
      highlights: [
        "Custom VPC with six subnets across availability zones",
        "Public, private, and database tier isolation",
        "Application Load Balancer routing traffic to EC2 tier",
        "Amazon RDS deployed in isolated data subnets",
        "NAT Gateway providing outbound internet for private subnets",
        "Security Groups and Network ACLs enforcing least-privilege access"
      ],
      github: null,              // REPLACE: "https://github.com/YOUR_USERNAME/aws-3tier"
      demo: null,
      architectureDiagram: null, // REPLACE: "assets/projects/aws-3tier/architecture.svg"
      screenshots: [],
      pipeline: null,
      deployment: null,
      notes: null
    },

    {
      id: "jenkins-cicd",
      title: "Jenkins CI/CD Pipeline",
      status: "completed",
      featured: true,
      category: ["ci-cd", "devops", "docker", "security"],
      shortDescription:
        "Built an end-to-end Jenkins CI pipeline covering source checkout, " +
        "code quality scanning, quality gate enforcement, security scanning, " +
        "artifact management, Docker image publishing, and webhook notifications.",
      description:
        "Implemented a Jenkins-based CI workflow that automates the full " +
        "application delivery process from source checkout through code " +
        "quality analysis, security scanning, artifact packaging and upload " +
        "to Sonatype Nexus, Docker image build and publish, and webhook " +
        "notifications. The pipeline enforces quality gates so a failing " +
        "SonarQube scan or Trivy security scan stops the build before " +
        "any artifact reaches the registry.",
      technologies: [
        "Jenkins", "Git", "GitHub", "SonarQube", "Trivy",
        "Sonatype Nexus", "Docker", "CI/CD", "Webhooks"
      ],
      highlights: [
        "Git source checkout",
        "SonarQube static code analysis",
        "SonarQube Quality Gate enforcement",
        "Application build/package stage",
        "Trivy security scan on built artifact",
        "Artifact archiving and packaging",
        "Upload to Sonatype Nexus repository",
        "Docker image build",
        "Docker image publishing to container registry",
        "Webhook notifications to Teams / Discord / Slack"
      ],
      github: null,              // REPLACE: "https://github.com/YOUR_USERNAME/jenkins-cicd"
      demo: null,
      architectureDiagram: null, // REPLACE: "assets/projects/jenkins-cicd/pipeline.svg"
      screenshots: [],
      pipeline: {
        type: "CI",
        label: "Jenkins CI Pipeline",
        stages: [
          { id: "checkout",     label: "Git Checkout",        description: "Pull application source code from the repository.", status: "completed" },
          { id: "sonarqube",    label: "SonarQube Scan",      description: "Analyze source code for quality and maintainability.", status: "completed" },
          { id: "quality-gate", label: "Quality Gate",        description: "Enforce quality thresholds — fail fast on violations.", status: "completed" },
          { id: "build",        label: "Build",               description: "Build and package the application.", status: "completed" },
          { id: "trivy",        label: "Trivy Security Scan", description: "Scan the built artifact for known vulnerabilities.", status: "completed" },
          { id: "archive",      label: "Archive Artifacts",   description: "Archive build outputs in Jenkins.", status: "completed" },
          { id: "package",      label: "Package Artifact",    description: "Package the artifact for repository upload.", status: "completed" },
          { id: "nexus",        label: "Nexus Repository",    description: "Upload the packaged artifact to Sonatype Nexus.", status: "completed" },
          { id: "docker-build", label: "Docker Build",        description: "Build the application Docker image.", status: "completed" },
          { id: "docker-push",  label: "Docker Push",         description: "Publish the Docker image to the container registry.", status: "completed" },
          { id: "notification", label: "Notifications",       description: "Send pipeline status via webhook notifications.", status: "completed" }
        ]
      },
      deployment: {
        type: "CD",
        label: "Jenkins → Argo CD → Kubernetes",
        stages: [
          { id: "jenkins",     label: "Jenkins",     description: "Build, scan, package, and publish application image."       },
          { id: "argocd",      label: "Argo CD",     description: "GitOps controller synchronizes desired application state." },
          { id: "kubernetes",  label: "Kubernetes",  description: "Runs and manages the containerized application."           },
          { id: "application", label: "Application", description: "Application deployed and running inside Kubernetes."       }
        ]
      },
      notes: null
    },

    {
      id: "kubernetes-argocd",
      title: "Kubernetes + Argo CD GitOps Deployment",
      status: "in-progress",
      featured: true,
      category: ["kubernetes", "gitops", "ci-cd"],
      shortDescription:
        "Building a GitOps deployment workflow using Jenkins CI, Argo CD, and Kubernetes.",
      description:
        "Currently extending the Jenkins CI pipeline into Kubernetes-based " +
        "continuous delivery. Application deployment configuration is " +
        "maintained in Git, and Argo CD is used to reconcile the Kubernetes " +
        "cluster state with the desired state defined in the repository.",
      technologies: [
        "Kubernetes", "Argo CD", "GitOps", "Docker", "Jenkins", "Git"
      ],
      highlights: [
        "Git as the source of deployment configuration",
        "Kubernetes application manifests",
        "Argo CD synchronization",
        "GitOps deployment workflow",
        "Containerized application deployment"
      ],
      github: null,
      demo: null,
      architectureDiagram: null,
      screenshots: [],
      pipeline: null,
      deployment: {
        type: "CD",
        label: "GitOps Deployment Flow",
        stages: [
          { id: "source",      label: "Git Repository", description: "Application and deployment config stored in Git."    },
          { id: "jenkins",     label: "Jenkins CI",     description: "Build, test, scan, and publish the application image." },
          { id: "argocd",      label: "Argo CD",        description: "Detect changes and synchronize desired state."         },
          { id: "kubernetes",  label: "Kubernetes",     description: "Deploy and manage application workloads."              },
          { id: "application", label: "Application",    description: "Application running in the Kubernetes environment."    }
        ]
      },
      notes:
        "This project is currently in progress and will be updated as implementation milestones are completed."
    }
    ,{
      id: "test-project",
      title: "Terraform AWS Infrastructure",
      status: "planned",
      featured: false,
      category: ["aws", "infrastructure-as-code"],
      shortDescription: "Test project — demonstrating extensibility.",
      description: "Temporary test project verifying data-driven architecture.",
      technologies: ["Terraform", "AWS"],
      highlights: [],
      github: null,
      demo: null,
      architectureDiagram: null,
      screenshots: [],
      pipeline: null,
      deployment: null,
      notes: null
    }

    // Add future projects here — no HTML change needed],

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

