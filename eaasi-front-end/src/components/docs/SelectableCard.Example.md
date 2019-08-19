### Example Usage

A Selectable Card contains grouped information about an entity that can be selected and optionally bookmarked.

Selectable Cards `data` prop currently must conform to the `IResource` interface. 
The `bookmark` prop is a Boolean value used to show or hide a Bookmark icon on the Card.
The `footer` props is used to add a footer to the card, which contains two named slots: `tagsLeft` and `tagsRight`.

---


Bookmarkable Selectable Card with tagData in both `tagsLeft` and `tagsRight` slots:

```js
    // Mock Data for displaying different configurations
    
    let tagGroupData1 = [
        { icon: 'fa-file', text: 'CONTENT ENVIRONMENT' }
    ]

    let tagGroupData2 = [
        { icon: 'fa-cloud', text: 'Foo', color: 'yellow' },
        { icon: 'fa-check', text: 'SAVED', color: 'yellow' },
    ]
    
    let resourceData = {
        id: 1,
        title: 'My Computer',
        content: {
            OS: 'Windows XP',
            Software: 'Adobe Photoshop',
            Version:  '19.31.2',
        },
        subContent: {
            Something: 'Else here',
            Date: '09/10/2019',
        },
    }
    
    <selectable-card :data="resourceData" :bookmark="true" :footer="true">
        <template v-slot:tagsLeft>
            <tag-group position="left" :tags="tagGroupData1" />
        </template>
        <template v-slot:tagsRight>
            <tag-group position="right" :tags="tagGroupData2" />
        </template>
    </selectable-card>
```

--- 

The Following Selectable Card contains no Footer

```js
    // Mock Data for displaying different configurations
    
    let resourceData = {
        id: 2,
        title: 'A Resource With No Tags',
        content: {
            OS: 'Windows XP',
            Software: 'Adobe Photoshop',
            Version:  '19.31.2',
        },
        subContent: {
            Location: 'Madison',
            Date: '09/10/2019',
        },
    }

    <selectable-card :data="resourceData" :bookmark="true" :footer="true" />
```

---

The following example illustrates how a resource card grows vertically as more data is added.

```js
    // Mock Data for displaying different configurations
    
    let tagGroupData1 = [
        { icon: 'fa-file', text: 'CONTENT ENVIRONMENT' }
    ]

    let tagGroupData2 = [
        { icon: 'fa-cloud', text: 'Foo', color: 'yellow' },
        { icon: 'fa-check', text: 'SAVED', color: 'yellow' },
    ]
    
    let resourceData = {
        id: 3,
        title: 'A Big Resource With A Lot Of Data',
        content: {
            OS: 'Windows XP',
            Software: 'Microsoft Word, Microsoft Excel',
            Version:  '19.31.2',
            Display: 'Some Monitor',
            'Sound Device': 'Some Sound Card',
            'Graphics Card': 'Some Graphics Card',
            Mouse: 'Yes',
            Keyboard: 'QWERTY',
            Other: 'Miscellaneous Data',
        },
        subContent: {
            Something: 'Else here',
            Date: '09/10/2019',
        },
    }
    
    let resource4 = {
        id: 4,
        title: 'This One Has Only Content',
        content: {
            OS: 'Windows Vista',
            Software: 'Napster',
            Version:  '7.1',
        },
    }

    <selectable-card :data="resourceData" :bookmark="true" :footer="true">
        <template v-slot:tagsLeft>
            <tag-group position="left" :tags="tagGroupData1" />
        </template>
        <template v-slot:tagsRight>
            <tag-group position="right" :tags="tagGroupData2" />
        </template>
    </selectable-card>
```

---

The following minimal example shows a Selectable Card with `bookmark = false`, `footer = false`, and no `data.subContent`.

```js
    // Mock Data for displaying different configurations
    
    let resourceData = {
        id: 123,
        title: 'A Minimal Selectable Card',
        content: {
            OS: 'Windows XP',
        },
    }

    <selectable-card :data="resourceData" :bookmark="false" :footer="false" />
```
