<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-31 16:28:30
 * @FilePath: /code/metaedit/src/layouts/RightForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="scene color-bg2">
      <div class="color-tx1">属性</div>
    </div>
    <div class="attribute">
      <el-form label-position="right" label-width="60px" :model="formValue6">
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <el-form-item label="类型">
            <div>按钮组</div>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="formValue6.name" size="small" />
          </el-form-item>
        </div>
      </el-form>
      <!-- 按钮组 -->
      <div class="card">
        <div class="card-header">
          <span class="color-tx1">按钮组</span>
          <el-popover
            placement="right"
            :width="300"
            trigger="click"
            :visible="visibleBtnGroup"
          >
            <template #reference>
              <el-button plain text @click="visibleBtnGroup = true"
                >添加</el-button
              >
            </template>
            <el-form
              ref="btnGroupFormRef"
              :model="formBtnGroup"
              label-width="60px"
              :rules="rules"
            >
              <el-form-item label="名称" prop="content">
                <el-input v-model="formBtnGroup.content" size="small" />
              </el-form-item>
            </el-form>
            <div class="btn-group">
              <q-btn
                flat
                label="取消"
                dense
                color="primary"
                @click="visibleBtnGroup = !visibleBtnGroup"
              />
              <q-btn
                flat
                label="确定"
                color="primary"
                @click="addBtnGroup()"
                dense
              />
            </div>
          </el-popover>
        </div>
        <div class="card-body">
          <tempalte v-if="btnGroupList.length > 0">
            <div
              class="card-body-item"
              v-for="(item, index) in btnGroupList"
              :key="index"
            >
              <span class="card-body-item-name">
                <span>{{ item.content }}</span>
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
                <el-form :model="item" label-width="60px">
                  <el-form-item label="名称">
                    <el-input v-model="item.content" size="small" />
                  </el-form-item>
                </el-form>
                <div class="btn-group">
                  <q-btn
                    flat
                    color="primary"
                    label="确定"
                    @click="handleEditBtnGroup(item)"
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
                    @click="deleteBtnGroup(index)"
                  />
                </div>
              </el-popover>
            </div>
          </tempalte>
          <tempalte v-else>
            <div class="card-body-item">
              <span class="card-body-item-name">
                <span>暂无按钮,请先添加吧</span>
              </span>
            </div>
          </tempalte>
        </div>
      </div>
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
import { useSceneStore } from "stores/scene";
import { useEditStore } from "stores/edit";
const edit = useEditStore(); //编辑
const scene = useSceneStore();


const btnGroupFormRef = ref(null);
const visibleBtnGroup = ref(false);
const formValue6 = ref({
  type: "buttonGroup",
  name: "",
});
//按钮列表
const btnGroupList = ref([
  {
    content: "播放",
    visible: false,
  },
  {
    content: "暂停",
    visible: false,
  },
  {
    content: "继续",
    visible: false,
  },
]);
//内容表单
const formBtnGroup = ref({
  content: "",
});
const rules = {
  content: [
    {
      required: true,
      message: "请输入名称",
      trigger: "blur",
    },
  ],
};
//添加内容
const addBtnGroup = () => {
  btnGroupFormRef.value.validate((valid) => {
    if (valid) {
      btnGroupList.value.push(formBtnGroup.value);
      visibleBtnGroup.value = false;
      //清空表单
      formBtnGroup.value = {
        content: "",
      };
    } else {
      console.log("error");
    }
  });
};
//编辑内容
const handleEditBtnGroup = (item) => {
  item.visible = false;
};
//删除内容
const deleteBtnGroup = (index) => {
  btnGroupList.value.splice(index, 1);
};

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
    action: "",
    visible: false,
  },
]);
//触发器列表
const triggerList = ref([
  {
    id: 1,
    name: "点击",
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
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
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
.btn-group {
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