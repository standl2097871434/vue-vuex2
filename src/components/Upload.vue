<template>
  <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      multiple
      :action="objectData.host"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="ossPolicy"
      :data="objectData"
      :limit="3"
      :on-exceed="handleExceed"
      :on-progress="onupload"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'

import type {UploadProps, UploadUserFile} from 'element-plus'
import axios from "axios";

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

const objectData =ref(
    {
      OSSAccessKeyId: '',
      policy: '',
      Signature: '',
      key: '',
      host: '',
      dir: ''
    })

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
      `The limit is 3, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
      } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
      () => true,
      () => false
  )
}
const onupload: UploadProps['onProgress']= (evt,uploadFile,uploadFiles)=>{
  console.log(objectData)
}
const ossPolicy: UploadProps['beforeUpload'] = (rawFile)=>{
  let _self = this;
  return new Promise((resolve, reject)=>{
    axios.get("http://localhost:8080/OSS/policy")
        .then(response=>{
          _self.objectData.OSSAccessKeyId=response.data.accessid;
          _self.objectData.policy=response.data.policy;
          _self.objectData.Signature=response.data.signature;
          _self.objectData.dir=response.data.dir;
          _self.objectData.host=response.data.host;
          _self.objectData.key=response.data.dir+"${filename}";

          // objectData.OSSAccessKeyId=response.data.accessid;
          // objectData.policy=response.data.policy;
          // objectData.Signature=response.data.signature;
          // objectData.dir=response.data.dir;
          // objectData.host=response.data.host;
          // objectData.key=response.data.dir+"${filename}";
          resolve(true);
          console.log("上传完毕")
        })
        .catch(error=>{
          console.log(error);
          reject(false)
        });
  });
}
</script>
<!--<script>-->
<!--import axios from "axios";-->
<!--export default {-->
<!--  name:"Upload",-->
<!--  data(){-->
<!--    return{-->
<!--      objectData:{-->
<!--        OSSAccessKeyId:'',-->
<!--        policy:'',-->
<!--        Signature:'',-->
<!--        key:'',-->
<!--        host:'',-->
<!--        dir:'',-->
<!--      },-->
<!--      fileList:[],-->
<!--    };-->
<!--  },-->
<!--  methods:{-->
<!--    ossPolicy(file){-->
<!--      console.log("上传")-->
<!--      let _self=this;-->
<!--      return new Promise((resolve, reject)=>{-->
<!--            axios.get("http://localhost:8080/OSS/policy")-->
<!--            .then(response=>{-->
<!--              _self.objectData.OSSAccessKeyId=response.data.accessid;-->
<!--              _self.objectData.policy=response.data.policy;-->
<!--              _self.objectData.Signature=response.data.signature;-->
<!--              _self.objectData.dir=response.data.dir;-->
<!--              _self.objectData.host=response.data.host;-->
<!--              _self.objectData.key=response.data.dir+"${filename}";-->
<!--              resolve(true);-->
<!--              console.log("上传完毕")-->
<!--              console.log(_self.objectData)-->
<!--            })-->
<!--            .catch(error=>{-->
<!--              console.log(error);-->
<!--              reject(false)-->
<!--              console.log(_self.objectData)-->
<!--            });-->
<!--      });-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
