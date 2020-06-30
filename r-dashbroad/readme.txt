
需要的库：

library(shiny)
library(shinydashboard)
library(dashboardthemes)

教师端运行命令：

shiny::runApp('./teacher/shiny', port=8888)


学生端运行命令：

shiny::runApp('./student/shiny', port=8887)
