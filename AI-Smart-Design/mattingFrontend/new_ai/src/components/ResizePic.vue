<template>
    <div 
        class="resize-container" 
        :style="containerStyle" 
        @mouseup="stopResize" 
        @mouseleave="stopResize" 
        ref="container"
    >
        <div class="resize-left" :style="leftStyle">
            <img :src="picL" :style="containerStyle" />
        </div>
        <span class="resize-move" @mousedown="resizeDown" :style="danStyle"></span>
        <div class="resize-right">
            <img :src="picR" :style="containerStyle" />
        </div>
    </div>

</template>

<script>
export default {
    name: 'ResizePic',
    data() {
        return {
            resizeLeft: 0,
            leftD: 15,
            rightD: 15
        }
    },
    props: {
        width: {
            type: String,
            required: true
        },
        height: {
            type: String,
            required: true
        },
        picL: {
            type: String,
            required: true
        },
        picR: {
            type: String,
            required: true
        }   
    },
    computed: {
        danStyle () {
            return { left: this.resizeLeft + 'px' };
        },
        containerStyle () {
            return { width: this.width + 'px', height: this.height + 'px' };
        },
        leftStyle () {
            return { width: this.resizeLeft + 'px' };
        }
    },
    mounted () {
        this.initResizeInfo();
    },
    methods: {
        initResizeInfo () {
            this.resizeLeft = this.width / 2
        },
        stopResize () {
            this.onDragEnd();
        },
        resizeDown (event) {
            event.preventDefault();
            window.addEventListener('mousemove', this.onDragging);
            window.addEventListener('touchmove', this.onDragging);
            window.addEventListener('mouseup', this.onDragEnd);
            window.addEventListener('touchend', this.onDragEnd);
        },
        onDragging(event) {
            let clintLeft = this.$refs.container.offsetLeft;
            if (event.type === 'touchstart') {
                event.clientX = event.touches[0].clientX;
            }
            if (this.resizeLeft < this.leftD) {
                this.resizeLeft = this.leftD;
            } else if (this.resizeLeft > this.width - this.leftD) {
                this.resizeLeft = this.width - this.leftD
            } else {
                this.resizeLeft = event.clientX - clintLeft;
            } 
            
        },
        onDragEnd() {
            window.removeEventListener('mousemove', this.onDragging);
            window.removeEventListener('touchmove', this.onDragging);
            window.removeEventListener('mouseup', this.onDragEnd);
            window.removeEventListener('touchend', this.onDragEnd);
        }
    }
}
</script>

<style scoped>
.resize-container {
  /* margin-left: 100px; */
  display: flex;
  position: relative;
}
.resize-left {
  position: absolute;
  height: 100%;
  z-index: 2;
  overflow: hidden;
}
.resize-right {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.resize-move {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #0073EB;
  cursor: col-resize;
  z-index: 3;
}
.resize-move::after {
  content: "< >";
  position: absolute;
  top: 50%;
  height: 30px;
  width: 30px;
  color: #ffffff;
  left: -14px;
  line-height: 30px;
  border-radius: 30px;
  background-color: #0073EB;
}
</style>