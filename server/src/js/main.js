const contents_title = document.getElementsByClassName('article_box_title')
const contents_text = document.getElementsByClassName('article_box_content')

document.getElementById('left_top_title').setAttribute('onclick', "location.href='http://anhye0n.me/'")

const contents_title_length = contents_title.length
const contents_text_length = contents_text.length

for (i = 0; i < contents_title_length; i++) {
    const contents_title_contents = contents_title[i].innerText
    const contents_title_contents_length = contents_title_contents.length

    if (contents_title_contents_length > 11) {
        contents_title[i].innerText = contents_title_contents.substr(0, 11) + ' ...'
    }
}
for (i = 0; i < contents_text_length; i++) {
    const contents_text_contents = contents_text[i].innerText
    const contents_text_contents_length = contents_text_contents.length

    if (contents_text_contents_length > 153) {
        contents_text[i].innerText = contents_text_contents.substr(0, 153) + ' ...'
    }
}

