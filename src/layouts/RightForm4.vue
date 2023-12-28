<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-28 10:45:36
 * @FilePath: /code/metaedit/src/layouts/RightForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 公共属性-->
    <div class="scene color-bg2">
      <div class="color-tx1">对话</div>
    </div>
    <div class="attribute">
      <div class="card">
        <div class="card-header">
          <span class="color-tx1">人物</span>
          <el-popover
            placement="right"
            :width="400"
            trigger="click"
            :visible="visiblePerson"
          >
            <template #reference>
              <!-- <q-btn
                flat
                color="#757575"
                label="添加"
                dense
                @click="visiblePerson = true"
              /> -->
              <el-button plain type="info" text @click="visiblePerson = true"
                >添加</el-button
              >
            </template>
            <el-form
              ref="ruleFormRef"
              :model="formValue"
              label-width="60px"
              :rules="rules"
            >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formValue.name" />
              </el-form-item>
            </el-form>
            <div class="btn-group">
              <q-btn
                flat
                label="取消"
                dense
                @click="visiblePerson = !visiblePerson"
              />
              <q-btn flat label="确定" @click="addPerson" dense />
            </div>
          </el-popover>
        </div>
        <div class="card-body">
          <div
            class="card-body-item"
            v-for="(item, index) in personList"
            :key="index"
          >
            <span class="card-body-item-name">
              <img
                v-if="item.fileUrl"
                :src="item.fileUrl"
                alt=""
                class="avatar"
              />
              <q-icon v-else name="bi-person-hearts" class="iconstyle" />
              <span>{{ item.name }}</span>
            </span>
            <el-popover
              placement="right"
              :width="400"
              trigger="click"
              :visible="item.visible"
            >
              <template #reference>
                <q-icon name="bi-pencil-square" class="iconstyle" />
              </template>
              <el-table :data="gridData">
                <el-table-column width="150" property="date" label="date" />
                <el-table-column width="100" property="name" label="name" />
                <el-table-column
                  width="300"
                  property="address"
                  label="address"
                />
              </el-table>
              <div>
                <q-btn
                  flat
                  color="primary"
                  label="确定"
                  @click="handleEdit"
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
                  @click="deletePerson(index)"
                />
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { handleError, reactive, ref } from "vue";
//视频
const personList = ref([
  {
    name: "小红",
    fileUrl: "",
    visible: false,
  },
  {
    name: "小蓝",
    fileUrl: "",
    visible: false,
  },
  {
    name: "小紫",
    fileUrl: "",
    visible: false,
  },
]);
const visiblePerson = ref(false);
const formValue = reactive({
  name: "",
  fileUrl: "",
});
const rules = {
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
    { min: 3, max: 5, message: "姓名长度为3-5之间", trigger: "blur" },
  ],
};
//添加人物
const addPerson = () => {
  console.log("addPerson");
  personList.value.push({
    name: "",
    fileUrl: "",
  });
  visiblePerson = false;
};
//编辑人物
const handleEdit = (index) => {
  console.log(index);
};
//删除人物
const deletePerson = (index) => {
  console.log("deletePerson");
  personList.value.splice(index, 1);
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
  // position: fixed;
  // width: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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