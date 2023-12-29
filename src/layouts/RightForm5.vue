<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-29 22:56:38
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
      <!-- 视频属性 -->
      <el-form label-position="right" label-width="80px" :model="formValue5">
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <el-form-item label="类型">
            <div>按钮</div>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="formValue5.name" size="small" />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1"></span>
          </div>
          <el-form-item label="按钮名称">
            <el-input v-model="formValue5.btnName" size="small" />
          </el-form-item>
          <el-form-item label="按钮图标">
            <el-input v-model="formValue5.btnIcon" size="small" />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">布局</span>
          </div>
          <el-form-item label="垂直" label-width="60px">
            <div>
              <el-select
                v-model="formValue5.verticalId"
                placeholder="Select"
                size="small"
                style="width: 100px; margin-right: 10px"
              >
                <el-option
                  v-for="item in verticalList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <el-input-number
                v-model="formValue5.verticalNumber"
                size="small"
                controls-position="right"
                style="width: 90px"
              />
            </div>
          </el-form-item>
          <el-form-item label="水平" label-width="60px">
            <div>
              <el-select
                v-model="formValue5.horizontalId"
                placeholder="Select"
                size="small"
                style="width: 100px; margin-right: 10px"
              >
                <el-option
                  v-for="item in horizontalList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <el-input-number
                v-model="formValue5.horizontalNumber"
                size="small"
                controls-position="right"
                style="width: 90px"
              />
            </div>
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
//水平下拉选择 （左、中、右）
const horizontalList = [
  {
    value: 1,
    label: "左",
  },
  {
    value: 2,
    label: "中",
  },
  {
    value: 3,
    label: "右",
  },
];
//垂直下拉选择（上、中、下）
const verticalList = [
  {
    value: 1,
    label: "上",
  },
  {
    value: 2,
    label: "中",
  },
  {
    value: 3,
    label: "下",
  },
];
//按钮
const formValue5 = ref({
  type: "button",
  name: "",
  btnName: "",
  btnIcon: "",
  horizontalId: 1,
  verticalId: 1,
  horizontalNumber: 100,
  verticalNumber: 100,
});
//事件弹框
const visibleEvent = ref(false);
const eventFormRef = ref(null);
//事件表单
const formEvent = ref({
  trigger: null,
  action: null,
});
//事件列表
const eventList = ref([
  {
    trigger: "点击",
    action: "开始",
    visible: false,
  },
  {
    trigger: "触摸",
    action: "停止",
    visible: false,
  },
  {
    trigger: "触摸",
    action: "开始",
    visible: false,
  },
]);
//触发器列表
const triggerList = ref([
  {
    id: 1,
    name: "点击",
  },
  {
    id: 2,
    name: "触摸",
  },
  {
    id: 3,
    name: "滑动",
  },
]);
//动作列表
const actionList = ref([
  {
    id: 1,
    name: "开始",
  },
  {
    id: 2,
    name: "停止",
  },
  {
    id: 3,
    name: "跳转",
  },
]);

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
  console.log("deletePerson");
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