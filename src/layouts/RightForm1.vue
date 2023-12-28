<!--
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-20 13:45:53
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-28 17:08:23
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
      <el-form label-position="right" label-width="60px" :model="formValue1">
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">基础</span>
          </div>
          <el-form-item label="类型">
            <div>{{ formValue1.public.typeName }}</div>
          </el-form-item>
          <el-form-item label="id">
            <el-input v-model="formValue1.public.id" />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="formValue1.public.name" />
          </el-form-item>
          <el-form-item label="变换">
            <div>
              <span class="lable">x</span>
              <el-input-number
                v-model="formValue1.public.size.x"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">y</span>
              <el-input-number
                v-model="formValue1.public.size.y"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">w</span>
              <el-input-number
                v-model="formValue1.public.size.w"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
            <div>
              <span class="lable">h</span>
              <el-input-number
                v-model="formValue1.public.size.h"
                :min="1"
                :max="10"
                size="small"
                controls-position="right"
                style="width: 80px"
              />
            </div>
          </el-form-item>
          <el-form-item label="隐藏">
            <el-checkbox v-model="formValue1.public.hide" />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">资源</span>
          </div>
          <el-form-item label="路径">
            <el-input v-model="formValue1.video.path" />
          </el-form-item>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="color-tx1">布局</span>
          </div>
          <el-form-item label="">
            <el-input v-model="formValue1.layout.id" />
          </el-form-item>
          <el-form-item>
            <div>
              <span class="lable">上</span>
              <el-input-number
                v-model="formValue1.layout.up"
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
                v-model="formValue1.layout.down"
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
                v-model="formValue1.layout.left"
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
                v-model="formValue1.layout.right"
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
          <el-form-item label="自动播放" label-width="100px">
            <el-checkbox v-model="formValue1.video.autoplay" />
          </el-form-item>
          <el-form-item label="循环" label-width="100px">
            <el-checkbox v-model="formValue1.video.loop" />
          </el-form-item>
          <el-form-item label="平铺类型" label-width="100px">
            <el-select
              v-model="formValue1.video.tileId"
              class="m-2"
              placeholder="Select"
              size="small"
            >
              <el-option
                v-for="item in formValue1.video.tileType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
const formValue1 = ref({
  // 变换：xy size
  // 显示隐藏
  public: {
    typeId: 1,
    typeName: "视频", //   类型（字符串）：固定值，不可编辑
    id: "", // id（字符串）：可以更改，用作写脚本时查找组件。
    name: "", // 名称（字符串）：可以更改，用作左侧大纲显示名称。
    size: {
      //变换：xy size
      x: 1,
      y: 1,
      w: 10,
      h: 10,
    },
    hide: true, //显示隐藏
  },
  video: {
    path: "", //路径（文件选择）：显示文件路径，点击按钮可以重新选择。
    loop: false, //循环（复选框）：勾选上，视频会自动循环。
    autoplay: false, //自动播放（复选框）：勾选上后，视频会自动播放。
    tileId: 1,
    tileType: [
      {
        value: 1,
        label: "拉伸",
      },
      {
        value: 2,
        label: "满铺",
      },
      {
        value: 3,
        label: "居中",
      },
    ], //平铺类型 可选项：拉伸、满铺、居中。
  },
  layout: {
    id: 1,
    up: 1,
    down: 1,
    left: 1,
    right: 1,
  },
});
//事件弹框
const visibleEvent = ref(false);
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
  .el-card__header {
    padding-top: 0;
    padding-bottom: 0;
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