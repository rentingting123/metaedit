<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2024-01-03 11:27:41
 * @FilePath: /code/metaedit/src/layouts/RightForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 视频 -->
    <div class="scene color-bg2">
      <div class="color-tx1">属性</div>
    </div>

    <div class="attribute">
      <!-- 视频属性 -->
      <el-form
        label-position="right"
        label-width="60px"
        :model="
          scene.projectList[0].scenes[scene.sceneIndex].objects[
            scene.objectsIndex
          ]
        "
      >
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <!-- {{
            scene.projectList[0].scenes[scene.sceneIndex].objects[
              scene.objectsIndex
            ].eventList
          }} -->
          <el-form-item label="类型">
            <div>序列帧</div>
          </el-form-item>
          <el-form-item label="name">
            <el-input
              v-model="
                scene.projectList[0].scenes[scene.sceneIndex].objects[
                  scene.objectsIndex
                ].name
              "
              size="small"
            />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">资源</span>
          </div>
          <el-form-item label="路径">
            <el-input
              v-model="
                scene.projectList[0].scenes[scene.sceneIndex].objects[
                  scene.objectsIndex
                ].path
              "
              size="small"
              style="width: 80%; margin-right: 10px"
            />
            <q-icon
              style="color: #ccc; font-size: 1.4em"
              name="bi-files"
              @click="selectFilePath"
            ></q-icon>
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">布局</span>
          </div>
          <el-form-item label="" label-width="20px">
            <el-select
              v-model="
                scene.projectList[0].scenes[scene.sceneIndex].objects[
                  scene.objectsIndex
                ].layout.name
              "
              class="m-2"
              placeholder="Select"
              size="small"
            >
              <el-option
                v-for="item in layoutList"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="20px">
            <div>
              <span class="lable">上</span>
              <el-input-number
                v-model="
                  scene.projectList[0].scenes[scene.sceneIndex].objects[
                    scene.objectsIndex
                  ].layout.up
                "
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">下</span>
              <el-input-number
                v-model="
                  scene.projectList[0].scenes[scene.sceneIndex].objects[
                    scene.objectsIndex
                  ].layout.down
                "
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">左</span>
              <el-input-number
                v-model="
                  scene.projectList[0].scenes[scene.sceneIndex].objects[
                    scene.objectsIndex
                  ].layout.left
                "
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">右</span>
              <el-input-number
                v-model="
                  scene.projectList[0].scenes[scene.sceneIndex].objects[
                    scene.objectsIndex
                  ].layout.right
                "
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">控制</span>
          </div>
          <el-form-item label-width="20px">
            <el-checkbox
              v-model="
                scene.projectList[0].scenes[scene.sceneIndex].objects[
                  scene.objectsIndex
                ].autoplay
              "
              label="自动播放"
            />
          </el-form-item>
          <el-form-item label-width="20px">
            <el-checkbox
              v-model="
                scene.projectList[0].scenes[scene.sceneIndex].objects[
                  scene.objectsIndex
                ].loop
              "
              label="循环"
            />
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
          <tempalte
            v-if="
              scene.projectList[0].scenes[scene.sceneIndex].objects[
                scene.objectsIndex
              ].eventList.length > 0
            "
          >
            <div
              class="card-body-item"
              v-for="(item, index) in scene.projectList[0].scenes[
                scene.sceneIndex
              ].objects[scene.objectsIndex].eventList"
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
import { computed, reactive, ref } from "vue";
import { useSceneStore } from "stores/scene";
import { useEditStore } from "stores/edit";
const edit = useEditStore(); //编辑
const scene = useSceneStore();

const layoutList = [
  {
    label: "拉伸",
  },
  {
    label: "缩放居中",
  },
  {
    label: "铺满居中",
  },
]; //平铺类型 可选项：拉伸、满铺、居中。

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

//触发器列表
const triggerList = ref([
  {
    id: 1,
    name: "开始播放",
  },
  {
    id: 2,
    name: "结束播放",
  },
]);
//动作列表
const actionList = computed(() => {
  const arr = scene.projectList[0].scenes[scene.sceneIndex].objects;
  return arr.length ? arr.filter((item) => item.type === "frame") : [];
});

//添加内容
const addEvent = () => {
  eventFormRef.value.validate((valid) => {
    if (valid) {
      console.log(scene.objectsIndex, "scene.objectsIndex");
      scene.projectList[0].scenes[scene.sceneIndex].objects[
        scene.objectsIndex
      ].eventList.push(formEvent.value);
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
  scene.projectList[0].scenes[scene.sceneIndex].objects[
    scene.objectsIndex
  ].eventList.splice(index, 1);
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
    scene.projectList[0].scenes[scene.sceneIndex].objects[
      scene.objectsIndex
    ].path = rel.filePath;
  } else {
    //用户取消，什么都不做。
  }
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