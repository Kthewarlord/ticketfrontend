<template>
    <div>
        <Header1/>
        <div class='max-w-3xl -mt-6 mb-10 w-full h-auto justify-center bg-white shadow-xl rounded-lg overflow-hidden mx-auto flex flex-col p-5 space-y-5'>
            <Nuxt/>
        </div>
    </div>
</template>

<script>
export default {
    // middleware:['saveToCookies'],
}
</script>