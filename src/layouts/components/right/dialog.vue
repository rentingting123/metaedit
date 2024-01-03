<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2024-01-03 12:11:44
 * @FilePath: /code/metaedit/src/layouts/RightForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 公共属性-->
    <div class="scene color-bg2">
      <div class="color-tx1">属性</div>
    </div>
    <div class="attribute">
      <el-form label-position="right" label-width="60px" :model="formValue4">
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <el-form-item label="类型">
            <div>对话框</div>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="formValue4.name" size="small" />
          </el-form-item>
        </div>
      </el-form>
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
              <el-button plain text @click="visiblePerson = true"
                >添加</el-button
              >
            </template>
            <el-form
              ref="ruleFormRef"
              :model="formValue"
              label-width="110px"
              :rules="rules"
            >
              <el-form-item label="">
                <el-upload
                  class="avatar-uploader"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="formValue.imageUrl"
                    :src="formValue.imageUrl"
                    class="avatar"
                  />
                  <div v-else class="avatar-uploader-icon">
                    <q-icon name="bi-plus" size="38px" />
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="人物名称" prop="name">
                <el-input v-model="formValue.name" size="small" />
              </el-form-item>
              <el-form-item label="头像">
                <el-input v-model="formValue.imageUrl" size="small" />
              </el-form-item>
            </el-form>
            <div class="btn-group">
              <q-btn
                flat
                label="取消"
                dense
                color="primary"
                @click="visiblePerson = !visiblePerson"
              />
              <q-btn
                flat
                label="确定"
                color="primary"
                @click="addPerson"
                dense
              />
            </div>
          </el-popover>
        </div>
        <div class="card-body">
          <tempalte v-if="personList.length > 0">
            <div
              class="card-body-item"
              v-for="(item, index) in personList"
              :key="index"
            >
              <span class="card-body-item-name">
                <img
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
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
                  <q-icon
                    name="bi-pencil-square"
                    class="iconstyle"
                    @click="item.visible = true"
                  />
                </template>
                <el-form :model="item" label-width="110px" :rules="rules">
                  <el-form-item label="">
                    <el-upload
                      class="avatar-uploader"
                      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img
                        v-if="item.imageUrl"
                        :src="item.imageUrl"
                        class="avatar"
                      />
                      <div v-else class="avatar-uploader-icon">
                        <q-icon name="bi-plus" size="38px" />
                      </div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="人物名称" prop="name">
                    <el-input v-model="item.name" size="small" />
                  </el-form-item>
                  <el-form-item label="头像">
                    <el-input v-model="item.imageUrl" size="small" />
                  </el-form-item>
                </el-form>
                <div class="btn-group">
                  <q-btn
                    flat
                    color="primary"
                    label="确定"
                    @click="handleEdit(item)"
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
          </tempalte>
          <tempalte v-else>
            <div class="card-body-item">
              <span class="card-body-item-name">
                <q-icon name="bi-person-hearts" class="iconstyle" />
                <span>请添加人物</span>
              </span>
            </div>
          </tempalte>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="color-tx1">对话内容</span>
          <el-popover
            placement="right"
            :width="400"
            trigger="click"
            :visible="visibleContent"
          >
            <template #reference>
              <el-button plain text @click="visibleContent = true"
                >添加</el-button
              >
            </template>
            <el-form
              ref="contentFormRef"
              :model="formCotent"
              label-width="110px"
              :rules="rulesCotent"
            >
              <el-form-item label="人物" prop="name">
                <el-select v-model="formCotent.name" placeholder="请选择">
                  <el-option
                    v-for="item in personList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <el-input
                  v-model="formCotent.content"
                  type="textarea"
                  size="small"
                />
              </el-form-item>
            </el-form>
            <div class="btn-group">
              <q-btn
                flat
                label="取消"
                dense
                color="primary"
                @click="visibleContent = !visibleContent"
              />
              <q-btn
                flat
                label="确定"
                color="primary"
                @click="addContent()"
                dense
              />
            </div>
          </el-popover>
        </div>
        <div class="card-body">
          <tempalte v-if="contentList.length > 0">
            <div
              class="card-body-item"
              v-for="(item, index) in contentList"
              :key="index"
            >
              <span class="card-body-item-name">
                <span>{{ item.name }}: {{ item.content }}</span>
              </span>
              <el-popover
                placement="right"
                :width="400"
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
                  <el-form-item label="人物" prop="name">
                    <el-select v-model="item.name" placeholder="请选择">
                      <el-option
                        v-for="item in personList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="内容">
                    <el-input
                      v-model="item.content"
                      type="textarea"
                      size="small"
                    />
                  </el-form-item>
                </el-form>
                <div class="btn-group">
                  <q-btn
                    flat
                    color="primary"
                    label="确定"
                    @click="handleEditContent(item)"
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
                    @click="deleteContent(index)"
                  />
                </div>
              </el-popover>
            </div>
          </tempalte>
          <tempalte v-else>
            <div class="card-body-item">
              <span class="card-body-item-name">
                <span>暂无对话内容,请先添加吧</span>
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
            <el-form ref="eventFormRef" :model="formEvent" label-width="80px">
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
import { handleError, reactive, ref } from "vue";
import { useSceneStore } from "stores/scene";
import { useEditStore } from "stores/edit";
const edit = useEditStore(); //编辑
const scene = useSceneStore();


const ruleFormRef = ref(null);
const contentFormRef = ref(null);
const formValue4 = ref({
  type: "dialog",
  name: "",
});
//人物列表
const personList = ref([
  {
    name: "小红",
    imageUrl: "",
    visible: false,
  },
  {
    name: "小蓝",
    imageUrl: "",
    visible: false,
  },
  {
    name: "小紫",
    imageUrl: "",
    visible: false,
  },
]);
//内容列表
const contentList = ref([
  {
    name: "小红",
    content: "欢迎来到游戏世界，请看完结束，再继续玩耍哦。。。",
    visible: false,
  },
  {
    name: "小蓝",
    content: "欢迎来到游戏世界，请看完结束，再继续玩耍哦。。。",
    visible: false,
  },
  {
    name: "小紫",
    content: "欢迎来到游戏世界，请看完结束，再继续玩耍哦。。。",
    visible: false,
  },
]);
const visiblePerson = ref(false);
const visibleContent = ref(false);
const formValue = ref({
  name: "",
  imageUrl: "",
});
//内容表单
const formCotent = ref({
  name: "",
  content: "",
});
const rules = {
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
    { min: 1, max: 10, message: "姓名长度为1-10之间", trigger: "blur" },
  ],
};
const rulesCotent = {
  name: [
    {
      required: true,
      message: "请选择人物",
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: "请输入内容",
      trigger: "change",
    },
  ],
};
const handleAvatarSuccess = (res) => {
  formValue.imageUrl = res.url;
};
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    console.log("上传头像图片只能是 JPG 格式!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.log("上传头像图片大小不能超过 2MB!");
  }
};
//添加人物
const addPerson = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      personList.value.push(formValue.value);
      visiblePerson.value = false;
      //清空表单
      formValue.value = {
        name: "",
        imageUrl: "",
      };
    } else {
      console.log("error");
    }
  });
};
//编辑人物
const handleEdit = (item) => {
  item.visible = false;
};
//删除人物
const deletePerson = (index) => {

  personList.value.splice(index, 1);
};
//添加内容
const addContent = () => {
  contentFormRef.value.validate((valid) => {
    if (valid) {
      contentList.value.push(formCotent.value);
      visibleContent.value = false;
      //清空表单
      formCotent.value = {
        name: "",
        content: "",
      };
    } else {
      console.log("error");
    }
  });
};
//编辑内容
const handleEditContent = (item) => {
  item.visible = false;
};
//删除内容
const deleteContent = (index) => {

  contentList.value.splice(index, 1);
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
    trigger: "对话开始",
    action: "",
    visible: false,
  },
  {
    trigger: "对话结束",
    action: "",
    visible: false,
  },
]);
//触发器列表
const triggerList = ref([
  {
    name: "对话开始",
  },
  {
    name: "对话结束",
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
  height: 30px;
  padding: 20px;
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #8c939d;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #8c939d;
}

.avatar-uploader-icon {
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  text-align: center;
  border: 1px dashed #8c939d;
}
</style>