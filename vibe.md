The goal is to release a version of LibreChat that is limited to the Ontario Building Code. The documentation  The tool will call a dedicated Open AI model that has the Ontario building code attached. The application will answer the chats and provide citations from the building code.

To begin, we need to remove a few features.

Left Sidepanel Menu
    - Remove Agent Marketplace from Menu

Right Menu
- Hide Entire Right Menu that contains Agent Builder, Promptes, Memories, etc

Footer
- Change from LibreChat v0.8.0 - Every AI for Everyone. to Ontario Building Code Buddy

Chat top Menu
- Remove Top Menu that includes model picker, presets, etc

Then we need to modify the code to call OpenAI with a prebuilt prompt that includes the Ontario Building Code context. We will need to extend LibreChat to support citations.

I need a detailed and logical plan for implementing these changes.

- Remove Terms of Service after registration
- Sign in automatically after registration

- Change Message "Welcome to LibreChat! Enjoy your expierience" to "Welcome to Ontrario Building Code Buddy! How can I assist you with the Ontario Building Code today?"
- The sidebar icon disappears after clicking it

- I NEED AN ICON - Treillium Leaf or something that represents Ontario
