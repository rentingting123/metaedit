/*
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-21 09:27:24
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-21 09:59:37
 * @FilePath: /code/metaedit/src/boot/element.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { boot } from 'quasar/wrappers';


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '../css/element-plus-dark.css'

export default boot(({ app }) => {
    app.use(ElementPlus)
});
