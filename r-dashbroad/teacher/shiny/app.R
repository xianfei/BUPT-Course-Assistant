library(shiny)
library(shinydashboard)
library(dashboardthemes)

logo_blue_gradient <- shinyDashboardLogoDIY(
  
  mainText = ""
  ,boldText = "北邮课程小助手"
  ,textSize = 16
  ,badgeText = "学生端"
  ,badgeTextColor = "#842eb3"
  ,badgeTextSize = 2
  ,badgeBackColor = "white"
  ,badgeBorderRadius = 3
  
)

ui <- dashboardPage(
  dashboardHeader(
    title = logo_blue_gradient,
    dropdownMenu(type = "messages", badgeStatus = "success",
                 messageItem(from = "王衔飞 提了一个问题",
                             message = "我上课没听懂",
                             time = "13:28",
                             icon = icon("question")
                 ),
                 messageItem(from = "崔阳 提了一个问题",
                             message = "我上课也没听懂",
                             icon = icon("question"),
                             time = "13:15"
                 ),
                 messageItem(from = "王衔飞 请求请假",
                             message = "下周的课需要去参加比赛",
                             icon = icon("hand-paper"),
                             time = "12-08"
                 )
    )
  ),
  dashboardSidebar(
    sidebarMenu(
      menuItem("总览", 
               tabName = "dashboard", 
               icon = icon("dashboard")
      ),
      menuItem("签到管理", 
               tabName = "checkin",
               icon = icon("file-signature")
      ),
      menuItem("课件发布", 
               tabName = "keynote",
               icon = icon("book")
      ),
      menuItem("点名系统", 
               tabName = "grades",
               icon = icon("list-alt")
      ),
      menuItem("作业管理", 
               tabName = "homework",
               icon = icon("file-word")
      ),
      menuItem("学生互动", 
               tabName = "stu",
               icon = icon("address-book")
      ),
      menuItem("直播系统", 
               tabName = "zb",
               icon = icon("television")
      ),
      menuItem("退出登录", 
               tabName = "exit",
               icon = icon("sign-out")
      )
    )
  ),
  
  dashboardBody(
    shinyDashboardThemes(
      theme = "onenote"
    ),
    tabItems(
      tabItem(
        tabName = "checkin",
        fluidRow(
          tags$iframe(
            frameborder="no",
            height=800, 
            width="100%",
            src = "http://127.0.0.1/kczs/inputPin.html"
          )
        )
      ),
      tabItem(
        tabName = "dashboard",
        fluidRow(                    
          fluidRow(
            tabBox(
              title = "下午好，王老师",
              side = "right", height = "250px",
              selected = "今日课程",
              width = 12,
              tabPanel("代办事项", "您目前还没有待办事项。"),
              tabPanel("未读消息", "您有3条未读消息。"),
              tabPanel("今日课程", "您今天没有还没有上的课程。")
            )
          )
          
        )
      ),
      tabItem(
        tabName = "keynote",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/ke-up.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "grades",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/dianming.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "homework",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/homew-t.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "zb",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/zb-t.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "stu",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/hudong-t.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "exit",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/logout.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      )
    )
  )
)


server <- function(input, output) {}
shinyApp(ui, server)