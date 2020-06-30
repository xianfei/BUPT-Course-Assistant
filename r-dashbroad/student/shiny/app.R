library(shiny)
library(shinydashboard)
library(dashboardthemes)

logo_blue_gradient <- shinyDashboardLogoDIY(
  
  mainText = ""
  ,boldText = "北邮课程小助手"
  ,textSize = 16
  ,badgeText = "学生端"
  ,badgeTextColor = "green"
  ,badgeTextSize = 2
  ,badgeBackColor = "white"
  ,badgeBorderRadius = 3
  
)

ui <- dashboardPage(
  dashboardHeader(
    title = logo_blue_gradient,
    dropdownMenu(type = "messages", badgeStatus = "success",
                 messageItem(from = "老师布置了一份作业",
                             message = "DDL: 2020-07-08",
                             time = "13:28",
                             icon = icon("file-word")
                 )
    )
  ),
  dashboardSidebar(
    sidebarMenu(
      menuItem("总览", 
               tabName = "dashboard", 
               icon = icon("dashboard")
      ),
      menuItem("课件笔记", 
               tabName = "checkin",
               icon = icon("file-signature")
      ),
      menuItem("教务助手", 
               tabName = "keynote",
               icon = icon("book")
      ),
      menuItem("成绩查询", 
               tabName = "grades",
               icon = icon("list-alt")
      ),
      menuItem("作业提交", 
               tabName = "homework",
               icon = icon("file-word")
      ),
      menuItem("提问交流", 
               tabName = "stu",
               icon = icon("address-book")
      ),
      menuItem("观看直播", 
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
      theme = "poor_mans_flatly"
    ),
    tabItems(
      tabItem(
        tabName = "checkin",
        fluidRow(
          tags$iframe(
            frameborder="no",
            height=600, 
            width="60%",
            src = "http://127.0.0.1/kejian/"
          ),
          tags$iframe(
            frameborder="no",
            height=600, 
            width="38%",
            src = "http://127.0.0.1/kczs/md.html"
          )
        )
      ),
      tabItem(
        tabName = "dashboard",
        fluidRow(                    
          fluidRow(
            tabBox(
              title = "下午好",
              side = "right", height = "250px",
              selected = "欢迎",
              width = 12,
              tabPanel("未完成作业", "您目前还没有未完成作业。"),
              tabPanel("未读消息", "您有3条未读消息。"),
              tabPanel("欢迎", "欢迎使用北邮课程小助手")
            )
          )
          
        )
      ),
      tabItem(
        tabName = "keynote",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/jiaowu.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "grades",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/chengji.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "homework",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/hw-s.html",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "zb",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/live",
                      frameborder="no",
                      height=800, 
                      width="100%")
        )
      ),
      tabItem(
        tabName = "stu",
        fluidRow(                    
          tags$iframe(seamless="seamless",
                      src="http://127.0.0.1/kczs/hudong-s.html",
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