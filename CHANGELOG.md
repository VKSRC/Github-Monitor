# Changelog

Github-Monitor所有的较为显著的变化都会写在本文件中。

## 2018-12-29

### Add

 - 添加了对英语的支持（修改默认语言请设置`client/config/config.js`中`locale`的`default`值,比如设置为`en-US`）。
 - 此前对于正在运行中的任务，操作处显示无，现在鼠标移动到无上时，提示`正在运行的任务无法编辑/删除`
 - 处理泄漏项时，鼠标移动到`忽略仓库`上时提示`忽略该仓库下发现的所有项目`

### Change

 - 调整Docker相关配置，以后更新代码/版本以后不再需要重新build，只需要从Github拉下最新代码，然后执行`docker-compose restart`即可。
 
 