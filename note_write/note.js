a = {
  // 清单版本号，建议使用 版本 2，版本 1 是旧的，已弃用，不建议使用
  "manifest_version": 2, 
  "name": "chome-plugin", // 插件名称
  "version": "1.8.6",  // 插件版本
  // 这里写些废话，举个栗子，‘应产品要求，杀个程序祭天’
  "description": "This is an extension for your chrome", 
  "icons": {
    "16": "images/custom/16x16.png",
    "48": "images/custom/48x48.png",
    "128": "images/custom/128x128.png"
  },
  //browser_action和page_action只能添加一个
  "browser_action": { //浏览器级别行为，所有页面均生效
    "default_icon": "images/custom/16x16.png",//图标的图片
    "default_title": "Hello ELSE", //鼠标移到图标显示的文字 
    "default_popup": "html/popup.html" //单击图标后弹窗页面
  }, 
  "page_action":{ //页面级别的行为，只在特定页面下生效 
    "default_icon":{
        "24":"images/custom/24x24.png",
        "38":"images/custom/38x38.png"
        },
    "default_popup": "html/popup.html",
    "default_title":"Hello ELSE"
  },

  // 可选
  "author": "ELSE TEAM",
  "automation": "...",   

  "background": {
    "scripts": [
      "scripts/background.js",
      "scripts/devtools-page.js"
    ]
  },
  "devtools_page": "html/devtools-page.html",

  // 定义对页面内容进行操作的脚本
  "content_scripts": [
    {
      "js":["js/else-insert.js"],
      "css": ["css/else-insert.css"],
      "matches":["<all_urls>"] // 只在这些站点下 content_scripts会运行
    }
  ],
  // 数组，声明插件所需要的权限，这里就是很危险的存在了，想干坏事的你是不是很激动！
  "permissions": [
    "cookies",
    "http://*/*",
    "management",
    "tabs",
    "contextMenus"
  ]
}