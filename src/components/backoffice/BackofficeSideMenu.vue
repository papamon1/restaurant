<template>
    <div class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white">

    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .side-menu{
        width: 300px;
        height: 400px;
        background-color: darkgrey;
    }

.navbar-vertical.navbar-expand-xs.fixed-left {
    left: 0;
    border-width: 0 1px 0 0;
}

.g-sidenav-pinned .sidenav {
    max-width: 250px!important;
}
.navbar-vertical.navbar-expand-xs {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 62px;
    overflow-y: auto;
    padding-left: 0;
    padding-right: 0;
}
.navbar-vertical.navbar-light {
    background-color: #f6f9fc;
    border-color: rgba(0,0,0,.05);
}
.bg-white {
    background-color: #fff!important;
}
.sidenav {
    z-index: 1050;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
}
.navbar-vertical {
    padding-top: 0;
    border-width: 0 0 1px 0;
    border-style: solid;
    -webkit-box-shadow: 0 0 2rem 0 rgba(136,152,170,.15);
    box-shadow: 0 0 2rem 0 rgba(136,152,170,.15);
}
.navbar, .navbar>.container, .navbar>.container-fluid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.navbar {
    position: relative;
    padding: 1rem 1rem;
}
</style>