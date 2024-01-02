import { defineStore } from "pinia";
import { useProjectStore } from "./project";
import { watch, ref } from "vue";
export const useSceneStore = defineStore("Scene", () => {
  const project = useProjectStore();
  const default_project = project.projectList[0]; //目前先去第一条，后期看需求
  console.log(default_project, "default_project");
  let scenesList = default_project.scenes;

  const sceneIndex = ref(0); //场景当前选中
  const main = ref(0); //主场景
  const renameSceneIpt = ref(""); //当前编辑的场景名字
  const curType = ref("scene"); //当前显示的属性

  //添加场景
  const addScene = () => {
    const i = scenesList.findIndex(
      (item) => item.name === "场景" + (scenesList.length + 1)
    );
    console.log(i);
    if (i !== -1) {
      const lastChar = scenesList[i].name[scenesList[i].name.length - 1];
      scenesList.push({
        name: "场景" + (Number(lastChar) + 1),
        objects: [], //图层
        path: "",
        direction: null,
      });
    } else {
      scenesList.push({
        name: "场景" + (scenesList.length + 1),
        objects: [], //图层
        path: "",
        direction: null,
      });
    }
  };
  const objectsType = ref([
    {
      name: "视频",
      type: "video",
      visible: true,
      other: {},
    },
    {
      name: "序列帧",
      type: "frame",
      visible: true,
      other: {},
    },
    {
      name: "图片",
      type: "photo",
      visible: true,
      other: {},
    },
    {
      name: "对话",
      type: "dialog",
      visible: true,
      other: {},
    },
    {
      name: "按钮",
      type: "button",
      visible: true,
      other: {},
    },
    {
      name: "按钮组",
      type: "buttonGroup",
      visible: true,
      other: {},
    },
    {
      name: "声音",
      type: "audio",
      visible: true,
      other: {},
    },
  ]);
  //添加场景类型
  const handleAddSceneType = (type, index) => {
    //找出  objectsType 的type 等于 type
    const i = objectsType.value.find((item) => item.type === type);
    scenesList[index].objects.push({
      ...i,
      name: i.name + (scenesList[index].objects.length + 1),
    });
  };
  //创建副本
  const copyCreate = (item) => {
    //动态添加name 不重复
    const i = scenesList.findIndex(
      (item) => item.name === "场景 副本" + (scenesList.length + 1)
    );
    if (i !== -1) {
      const lastChar = scenesList[i].name[scenesList[i].name.length - 1];
      scenesList.push({
        name: "场景 副本" + (Number(lastChar) + 1),
        objects: [], //图层
      });
    } else {
      scenesList.push({
        name: "场景 副本" + (scenesList.length + 1),
        objects: [], //图层
      });
    }
  };
  //重命名
  const renameScene = (index) => {
    //深度克隆
    renameSceneIpt.value = index;
  };
  //场景删除
  const deleteScene = (index) => {
    scenesList.splice(index, 1);
  };
  //设置为启动场景
  const setSceneStart = (index, name) => {
    main.value = index;
    default_project.main = name;
  };

  return {
    default_project,
    scenesList,
    sceneIndex,
    main,
    renameSceneIpt,
    curType,
    addScene,
    handleAddSceneType,
    copyCreate,
    renameScene,
    deleteScene,
    setSceneStart,
  };
});
