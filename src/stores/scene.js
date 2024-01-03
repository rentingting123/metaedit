import { defineStore } from "pinia";
import { ref } from "vue";
export const useSceneStore = defineStore("Scene", () => {
  //项目列表
  const projectList = ref([]);
  const sceneIndex = ref(0); //场景当前选中
  const objectsIndex = ref(); //图层当前选中
  const main = ref(0); //主场景
  const renameSceneIpt = ref(""); //当前编辑的场景名字
  const curType = ref("scene"); //当前显示的属性

  //添加场景
  const addScene = () => {
    const i = projectList.value[0]?.scenes.findIndex(
      (item) => item.name === "场景" + (projectList.value[0]?.scenes.length + 1)
    );
    if (i !== -1) {
      const lastChar =
        projectList.value[0]?.scenes[i].name[
          projectList.value[0]?.scenes[i].name.length - 1
        ];
      projectList.value[0]?.scenes.push({
        name: "场景" + (Number(lastChar) + 1),
        objects: [], //图层
        path: "", //图层属性 脚本
        direction: null, //图层属性 方向
        eventList: [], //事件列表
      });
    } else {
      let obj = {
        name: "场景" + (projectList.value[0]?.scenes.length + 1),
        objects: [], //图层
        path: "", //图层属性 脚本
        direction: null, //图层属性 方向
        eventList: [], //事件列表
      };
      console.log(obj, 222);
      projectList.value[0]?.scenes.push(obj);
    }
  };
  const objectsType = ref([
    {
      name: "视频",
      type: "video",
      visible: true,
      path: "", //路径（文件选择）
      loop: false, //循环（复选框）：勾选上视频会自动循环。
      autoplay: false, //自动播放（复选框）：勾选上后，视频会自动播放。
      layout: {
        name: "拉伸",
        up: 1,
        down: 1,
        left: 1,
        right: 1,
      },
      eventList: [], //事件列表
    },
    {
      name: "序列帧",
      type: "frame",
      visible: true,
      path: "", //路径（文件选择）
      loop: false, //循环（复选框）：勾选上视频会自动循环。
      autoplay: false, //自动播放（复选框）：勾选上后，视频会自动播放。
      layout: {
        name: "拉伸",
        up: 1,
        down: 1,
        left: 1,
        right: 1,
      },
      eventList: [], //事件列表
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
      path: "", //路径（文件选择）
      loop: false, //循环（复选框）：勾选上视频会自动循环。
      autoplay: false, //自动播放（复选框）：勾选上后，视频会自动播放。
      layout: {
        name: "拉伸",
        up: 1,
        down: 1,
        left: 1,
        right: 1,
      },
      eventList: [], //事件列表
    },
  ]);
  //添加场景类型
  const handleAddSceneType = (type, index) => {
    //找出  objectsType 的type 等于 type
    const i = objectsType.value.find((item) => item.type === type);
    projectList.value[0]?.scenes[index].objects.push({
      ...i,
      name: i.name + (projectList.value[0]?.scenes[index].objects.length + 1),
    });
  };
  //创建副本
  const copyCreate = (item) => {
    //动态添加name 不重复
    const i = projectList.value[0]?.scenes.findIndex(
      (item) =>
        item.name === "场景 副本" + (projectList.value[0]?.scenes.length + 1)
    );
    if (i !== -1) {
      const lastChar =
        projectList.value[0]?.scenes[i].name[
          projectList.value[0]?.scenes[i].name.length - 1
        ];
      projectList.value[0]?.scenes.push({
        name: "场景 副本" + (Number(lastChar) + 1),
        objects: [], //图层
      });
    } else {
      projectList.value[0]?.scenes.push({
        name: "场景 副本" + (projectList.value[0]?.scenes.length + 1),
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
    projectList.value[0]?.scenes.splice(index, 1);
  };
  //设置为启动场景
  const setSceneStart = (index, name) => {
    main.value = index;
    projectList.value[0].main = name;
  };

  return {
    projectList,
    sceneIndex,
    objectsIndex,
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
