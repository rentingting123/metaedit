<template>
  <el-dialog v-model="dialogProject" title="新建">
    <el-form :model="formProject" :rules="rules" ref="projectRef">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="formProject.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="保存路径" prop="rootPath">
        <el-input
          v-model="formProject.rootPath"
          autocomplete="off"
          style="width: 90%; margin-right: 10px"
        />
        <q-icon
          style="color: #ccc; font-size: 1.4em"
          name="bi-files"
          @click="selectFilePath"
        ></q-icon>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm"> 确定 </el-button>
        <el-button @click="close">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup >
import { ref } from "vue";
import { useProjectStore } from "stores/project";
import { useEditStore } from "stores/edit";
const edit = useEditStore(); //编辑
const project = useProjectStore(); // 场景

// 弹框表单
// 新建弹窗
const dialogProject = ref(false);
const open = () => {
  dialogProject.value = true;
};
const close = () => {
  dialogProject.value = false;
};

// 新建弹窗
const projectRef = ref(null);

//项目表单值
const formProject = ref({
  name: "",
  rootPath: "",
  scenes: [
    {
      name: "场景1",
      objects: [],
    },
  ],
  main: "场景1",
});
const rules = {
  name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
  rootPath: [
    {
      required: true,
      message: "请选择项目地址",
      trigger: "change",
    },
  ],
};
//保存路径
const selectFilePath = async () => {
  // openFile 该方法只返回文件路径，适用于打开文件。
  //打开并读取，返回文件内容。openAndReadFile
  let rel = await edit.selectDir();

  //打开成功
  if (rel) {
    console.log("文件路径:", rel.filePath);
    // console.log("文件内容:", rel.data.toString());
    formProject.value.rootPath = rel.filePath;
  } else {
    //用户取消，什么都不做。
  }
};
//新建提交
const submitForm = async () => {
  await projectRef.value.validate((valid, fields) => {
    if (valid) {
      console.log("success submit!", formProject.value);
      project.addProject(formProject.value);
      close();
    } else {
      console.log("error submit!", fields);
    }
  });
};
defineExpose({
  open,
  close,
});
</script>

<style>
</style>