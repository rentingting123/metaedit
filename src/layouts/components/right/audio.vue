<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-31 23:37:52
 * @FilePath: /code/metaedit/src/layouts/RightForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 公共属性-->
    <!-- 视频 -->
    <div class="scene color-bg2">
      <div class="color-tx1">属性</div>
    </div>
    <div class="attribute">
      <!-- 声音属性 -->
      <el-form label-position="right" label-width="60px" :model="formValue7">
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <el-form-item label="类型">
            <div>声音</div>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="formValue7.name" size="small" />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">资源</span>
          </div>
          <el-form-item label="路径">
            <el-input v-model="formValue7.path" size="small" />
          </el-form-item>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="color-tx1">控制</span>
          </div>
          <el-form-item label-width="20px">
            <el-checkbox v-model="formValue7.autoplay" label="自动播放" />
          </el-form-item>
          <el-form-item label-width="20px">
            <el-checkbox v-model="formValue7.loop" label="循环" />
          </el-form-item>
        </div>
      </el-form>
      <div class="card">
        <div class="card-header">
          <span class="color-tx1">事件</span>
          <el-popover
            placement="right"
            :width="300"
            trigger="click"
            :visible="visibleEvent"
          >
            <template #reference>
              <el-button plain text @click="visibleEvent = true"
                >添加</el-button
              >
            </template>
            <el-form
              ref="eventFormRef"
              :model="formEvent"
              label-width="80px"
              :rules="rulesEvent"
            >
              <el-form-item label="触发器" prop="trigger">
                <el-select v-model="formEvent.trigger" placeholder="请选择">
                  <el-option
                    v-for="item in triggerList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="动作" prop="action">
                <el-select v-model="formEvent.action" placeholder="请选择">
                  <el-option
                    v-for="item in actionList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="btn-group">
              <q-btn
                flat
                label="取消"
                dense
                color="primary"
                @click="visibleEvent = !visibleEvent"
              />
              <q-btn
                flat
                label="确定"
                color="primary"
                @click="addEvent()"
                dense
              />
            </div>
          </el-popover>
        </div>
        <div class="card-body">
          <tempalte v-if="eventList.length > 0">
            <div
              class="card-body-item"
              v-for="(item, index) in eventList"
              :key="index"
            >
              <span class="card-body-item-name">
                <span>{{ item.trigger }}{{ item.action }}</span>
              </span>
              <el-popover
                placement="right"
                :width="300"
                trigger="click"
                :visible="item.visible"
              >
                <template #reference>
                  <q-icon
                    name="bi-pencil-square"
                    class="iconstyle"
                    @click="item.visible = true"
                  />
                </template>
                <el-form :model="item" label-width="110px">
                  <el-form-item label="触发器" prop="name">
                    <el-select v-model="item.trigger" placeholder="请选择">
                      <el-option
                        v-for="item1 in triggerList"
                        :key="item1.name"
                        :label="item1.name"
                        :value="item1.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="动作">
                    <el-select v-model="item.action" placeholder="请选择">
                      <el-option
                        v-for="item2 in actionList"
                        :key="item2.name"
                        :label="item2.name"
                        :value="item2.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div class="btn-group">
                  <q-btn
                    flat
                    color="primary"
                    label="确定"
                    @click="handleEditEvent(item)"
                    dense
                  />
                  <q-btn
                    flat
                    color="primary"
                    label="取消"
                    dense
                    @click="item.visible = !item.visible"
                  />
                  <q-btn
                    flat
                    color="primary"
                    label="删除"
                    dense
                    @click="deleteEvent(index)"
                  />
                </div>
              </el-popover>
            </div>
          </tempalte>
          <tempalte v-else>
            <div class="card-body-item">
              <span class="card-body-item-name">
                <span>暂无事件,请先添加吧</span>
              </span>
            </div>
          </tempalte>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

//视频
const formValue7 = ref({
  type: "audio",
  name: "",
  path: "", //路径（文件选择）：显示文件路径，点击按钮可以重新选择。
  loop: false, //循环（复选框）：勾选上，视频会自动循环。
  autoplay: false, //自动播放（复选框）：勾选上后，视频会自动播放。
});
//事件弹框
const visibleEvent = ref(false);
const eventFormRef = ref(null);
//内容表单
const formEvent = ref({
  trigger: null,
  action: null,
});
const rulesEvent = {
  trigger: [
    {
      required: true,
      message: "请选择",
      trigger: "blur",
    },
  ],
  action: [
    {
      required: true,
      message: "请选择",
      trigger: "blur",
    },
  ],
};

//事件列表
const eventList = ref([
  {
    trigger: "播放开始",
    action: "",
    visible: false,
  },
  {
    trigger: "播放结束",
    action: "",
    visible: false,
  },
]);
//触发器列表
const triggerList = ref([
  {
    id: 1,
    name: "播放开始",
  },
  {
    id: 2,
    name: "播放结束",
  },
]);
//动作列表
const actionList = ref([]);

//添加内容
const addEvent = () => {
  eventFormRef.value.validate((valid) => {
    if (valid) {
      eventList.value.push(formEvent.value);
      visibleEvent.value = false;
      //清空表单
      formEvent.value = {
        trigger: null,
        action: null,
      };
    } else {
      console.log("error");
    }
  });
};
//编辑内容
const handleEditEvent = (item) => {
  item.visible = false;
};
//删除内容
const deleteEvent = (index) => {
  eventList.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.scene {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #000;
  /* 固定在顶部栏 */
  position: fixed;
  width: 100%;
}
.attribute {
  padding: 40px 0;
  color: #fff;
  .card {
    border-bottom: 1px solid #333;
    padding: 0 10px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 20px;
  }
  .lable {
    margin-right: 6px;
    margin-left: 6px;
  }
}
.btn-group {
  // display: flex;
  // justify-content: space-between;
  text-align: right;
}
.card-body {
  padding: 10px 20px;
  border: 1px solid #333;
  color: $text1;
  margin: 10px;
  .card-body-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    .card-body-item-name {
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .iconstyle {
        margin-right: 10px;
      }
    }
  }
}
</style>