<template>
    <div class="flex justify-center mt-5">
        <FormKit type="form"
        :actions="false"
        >
            <FormKit type="multi-step"
            tab-style="progress"
            :allow-incomplete="false"   
            >
                <FormKit type="step" name="Destination">
                <!-- collect name, email, and company info -->
                    <FormKit 
                        type="text" 
                        label="Destination" 
                        validation=""
                    />
                    <FormKit 
                        type="number" 
                        label="Duration" 
                        validation="" 
                    />
                </FormKit>

                <FormKit type="step" name="Preferences">
                <!-- Get talk title, brief, and track -->
                <FormKit 
                    type="text" 
                    label="Talk Title" 
                    validation="required"
                />
                <FormKit 
                    type="textarea" 
                    label="Talk Brief" 
                    validation="required|length:100"
                    help="What is your talk about?"
                />
                <FormKit 
                    type="radio" 
                    label="Talk Track"
                    help="Which track are you submitting for?"
                    :options="['Development', 'Testing', 'Leadership']"
                />
                </FormKit>

                <FormKit type="step" name="Let's go!">
                <!-- Ask the user to share how they heard about us -->
                <h2>Thank you for taking the time to submit your talk</h2>
                <p>If you don't mind we'd love to know how you heard about VueUniverse.</p>
                <FormKit 
                    type="radio" 
                    label="How did you hear about VueUniverse?" 
                    :options="['Online Ad', 'Friend or Coworker', 'Search Results', 'Other']"
                />
                <template #stepNext>
                    <FormKit type="submit" />
                </template>
                </FormKit>
            </FormKit> 
        </FormKit>
</div>
    
    
</template>

<script>
   
</script>
<style>

</style>