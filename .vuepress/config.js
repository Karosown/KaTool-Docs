module.exports = {
  title: 'KaTool',  
  description: '卡托',
  themeConfig: {
    sidebar: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Redis工具包', link: '/RedisUtils/' },
      { text: 'Excel工具包', link: '/ExcelUtils/' },
      { text: '图片与Base64转换工具包', link: '/ImageUtils/'},
      { text: '校验工具包',
        items:[
          { text: 'IP地址工具包（Nginx反向代理解决）',link: '/Verify/IpUtils/'},
          { text: '身份证校验工具包',link: '/Verify/IdCardValidUtils/'},
          { text: '验证码工具包', link: '/Verify/GenerateCodeUtil/' },
          { text: 'AuthUtil',link: '/Verify/AuthUtil/'},
          { text: 'KaTool-Security鉴权框架',link:'http://auth.katool.cn/'}
      ]},
      { text: '云存储OSS-SDK',
        items:[
        {text: '七牛云SDK(V1.9.5.BETA及其之前)', link: '/OSS/QiNiuOssSDK/'},
        {text: '综合SDK(V1.9.5.GAMA及其之后)', link: '/OSS/OssSDK/'}
      ]
    },
      { text: '定时任务调度', link: '/ScheDuledTaskUtil/'},
      { text: '类加载和Bean管理', link: '/ClassLoaderAndBeanUtils/'},
      { text: '站外连接',
        items:[
          { text: 'KaTool',link: 'https://github.com/Karosown/KaTool'},
          { text: 'KaToolTest',link: 'https://github.com/Karosown/KaToolTest'},
          { text: '在github上修改本页面', link: 'https://github.com/Karosown/KaTool-Docs' },
          { text: 'Karos\'Blog', link: 'https://www.wzl.fyi/' }
        ]},
    ]
  }
}