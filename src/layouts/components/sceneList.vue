<template>
  <div class="content">
    <div class="scene color-bg2" v-if="!showSearchScene">
      <div class="color-tx1">场景</div>
      <div>
        <q-btn flat color="primary" label="添加" @click="addScene" dense />
      </div>
    </div>

    <!-- 场景列表 -->
    <div class="side-list">
      <div
        class="side-item color-tx1"
        v-for="(item, index) in sceneList"
        :key="index"
        :class="{ active: sceneIndex === index }"
        @click="handleSceneClick(index)"
      >
        <span>
          <q-icon
            v-if="index === mainScene"
            name="bi-layout-wtf"
            class="iconstyle"
          />
          <span v-if="index === renameSceneIpt">
            <el-input
              v-model="item.name"
              style="width: 100px"
              @blur="renameSceneIpt = ''"
          /></span>
          <span v-else>{{ item.name }}</span>
        </span>
        <div class="side-item-menu">
          <q-icon name="bi-three-dots-vertical" class="menu-icon" />
          <q-menu dark transition-show="flip-right" transition-hide="flip-left">
            <q-list dense style="min-width: 100px">
              <q-item>
                <q-item-section> 添加 </q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>
                <q-menu
                  auto-close
                  dark
                  transition-show="flip-right"
                  transition-hide="flip-left"
                  anchor="top end"
                  self="top start"
                >
                  <q-list dense style="min-width: 100px">
                    <q-item
                      clickable
                      @click="handleAddSceneType('video', index)"
                    >
                      <q-item-section>
                        <div>
                          <q-icon
                            name="bi-camera-video"
                            class="iconstyle"
                          />视频
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="handleAddSceneType('frame', index)"
                    >
                      <q-item-section>
                        <div>
                          <q-icon
                            name="bi-cursor-text"
                            class="iconstyle"
                          />序列帧
                        </div></q-item-section
                      >
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      @click="handleAddSceneType('photo', index)"
                    >
                      <q-item-section>
                        <div>
                          <q-icon name="bi-card-image" class="iconstyle" />图片
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="handleAddSceneType('dialog', index)"
                    >
                      <q-item-section
                        ><div>
                          <q-icon name="bi-chat-dots" class="iconstyle" />对话
                        </div></q-item-section
                      >
                    </q-item>
                    <q-item
                      clickable
                      @click="handleAddSceneType('button', index)"
                    >
                      <q-item-section
                        ><div>
                          <q-icon name="bi-stop-fill" class="iconstyle" />按钮
                        </div></q-item-section
                      >
                    </q-item>
                    <q-item
                      clickable
                      @click="handleAddSceneType('buttonGroup', index)"
                    >
                      <q-item-section
                        ><div>
                          <q-icon name="bi-stop-btn" class="iconstyle" />按钮组
                        </div></q-item-section
                      >
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      @click="handleAddSceneType('audio', index)"
                    >
                      <q-item-section
                        ><div>
                          <q-icon name="bi-mic" class="iconstyle" />声音
                        </div></q-item-section
                      >
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section @click="copyCreate(item)"
                  >创建副本
                </q-item-section>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section @click="renameScene(index)"
                  >重命名</q-item-section
                >
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable v-if="sceneList.length > 1">
                <q-item-section @click="deleteScene(index)"
                  >删除</q-item-section
                >
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="setSceneStart(index, item.name)"
                  >设置为启动场景</q-item-section
                >
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </div>
    <!-- {{ sceneList }} -->
  </div>
</template>

<script setup >
import { watch, ref } from "vue";
//向外抛出的事件列表
const emit = defineEmits(["handleSceneList", "handleMain", "handleSceneIndex"]);
// 场景
const showSearchScene = ref(false); //场景
const sceneIndex = ref(0); //场景当前选中
const sceneList = ref([
  {
    name: "场景1",
    objects: [], //图层
  },
]);
//主场景
const mainScene = ref(0);
const renameSceneIpt = ref(""); //当前编辑的场景名字
const levelType = ref({
  video: "视频",
  frame: "序列帧",
  photo: "图片",
  dialog: "对话",
  button: "按钮",
  buttonGroup: "按钮组",
  audio: "声音",
});

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
const addScene = () => {
  //给sceneList 追加
  /* sceneList.value 中的name 是否
    等于 输入的值  如果等于 则不添加
    否则添加
    */
  const i = sceneList.value.findIndex(
    (item) => item.name === "场景" + (sceneList.value.length + 1)
  );
  if (i !== -1) {
    const lastChar =
      sceneList.value[i].name[sceneList.value[i].name.length - 1];
    sceneList.value.push({
      name: "场景" + (Number(lastChar) + 1),
      objects: [], //图层
      path: "",
      direction: null,
    });
  } else {
    sceneList.value.push({
      name: "场景" + (sceneList.value.length + 1),
      objects: [], //图层
      path: "",
      direction: null,
    });
  }
};

// 一级场景点击
const handleSceneClick = (index) => {
  sceneIndex.value = index;
  emit("handleSceneIndex", index, "scene");
};
//场景删除
const deleteScene = (index) => {
  sceneList.value.splice(index, 1);
};
//添加场景类型
const handleAddSceneType = (type, index) => {
  //找出  objectsType 的type 等于 type
  const i = objectsType.value.find((item) => item.type === type);
  sceneList.value[index].objects.push({
    ...i,
    name: i.name + (sceneList.value[index].objects.length + 1),
  });
};
//设置场景
const setSceneStart = (index, name) => {
  mainScene.value = index;
  // 场景发生变化就提交给父组件
  emit("handleMain", name);
};
//重命名
const renameScene = (index) => {
  //深度克隆
  renameSceneIpt.value = index;
};
//创建副本
const copyCreate = (item) => {
  //动态添加name 不重复
  const i = sceneList.value.findIndex(
    (item) => item.name === "场景 副本" + (sceneList.value.length + 1)
  );
  if (i !== -1) {
    const lastChar =
      sceneList.value[i].name[sceneList.value[i].name.length - 1];
    sceneList.value.push({
      name: "场景 副本" + (Number(lastChar) + 1),
      objects: [], //图层
    });
  } else {
    sceneList.value.push({
      name: "场景 副本" + (sceneList.value.length + 1),
      objects: [], //图层
    });
  }
};
//sceneList 发生变化就提交给父组件
watch(sceneList.value, (newVal, oldVal) => {
  // 场景发生变化就提交给父组件
  emit("handleSceneList", newVal);
});
</script>
<style lang="scss" scoped>
.side-list {
  padding-top: 60px;
}
.side-item-menu {
  display: none;
}
.side-item {
  text-align: left;
  width: 100%;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 鼠标移入高亮 */
  &:hover {
    background: #333;
    color: #fff;
    .side-item-menu {
      display: block;
    }
  }
  &.active {
    background: #333;
    color: rgb(22, 132, 252);
    .side-item-menu {
      display: block;
    }
  }
}

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
.search-ipt {
  height: 20px;
  margin-left: 20px;
}
.iconstyle {
  margin-right: 6px;
}
</style>
