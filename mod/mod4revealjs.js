function toAnchorId(text)
{
    return text.toLowerCase().replace(/[ (),-/:+*[\]_]|&lt;|&gt;|&amp;/g, "").replace(/<[^>]+>/g, "");
}
document.querySelectorAll(".slides > section > section > nav[data-auto]").forEach(function(toc)
{
    var headers = toc.parentElement.parentElement.querySelectorAll(".slides > section > section > h2");
    headers.forEach(function(header)
    {
        if (!header.hasAttributes("no-toc"))
        {
            var anchor_id = toAnchorId(header.innerHTML)
            header.parentElement.id = anchor_id;
            var anchor = document.createElement("a");
            anchor.innerHTML = header.innerHTML;
            anchor.setAttribute( "href", "#/" + anchor_id);
            toc.appendChild(anchor);
        }
    });
});

function trimLeft(input)
{
    return input.replace(/^[\s\uFEFF\xA0]+/g, '');
}

function trimSpaces(input)
{
    lines = input.split('\n');
    // trim empty lines from the beginning
    for (var i = 0; i < lines.length; ++i)
    {
        if(lines[i].trim()==='')
            lines.splice(i--, 1);
        else
            break;
    }
    // trim empty lines from the end
    for (var i = lines.length-1; i >= 0 ; --i)
    {
        if(lines[i].trim()==='')
            lines.splice(i, 1);
        else
            break;
    }
    var space_to_remove = lines.reduce(function(min_space_count, line)
    {
        var line_length = line.length;
        if (line_length==0)
            return min_space_count;
        var trimed_length = trimLeft(line).length;
        if (trimed_length==0)
            return min_space_count;
        var space_count = line_length - trimed_length;
        return (min_space_count > space_count) ? space_count : min_space_count;
    }, Number.POSITIVE_INFINITY );

    lines = lines.map(function(line)
    {
        return line.slice(space_to_remove);
    });

    return lines.join("\n");
}

function initAfterHighlightJS()
{
    document.querySelectorAll("cppcode, cppblock").forEach(function(tag)
    {
        tag.classList.add("cpp");
        hljs.highlightBlock(tag);
    });
}

function convertHTMLSpecialCharacters(input)
{
    // var el = document.createElement("div");
    // el.innerText = el.textContent = input;
    // var output = el.innerHTML;
    // return output;
    input = input.replace(/<\/[^>]*>/g, "");
    //input = input.replace(/<(.*)=""(.*)>/g, "<$1$2>");
    input = input.replace(/</g, "<font style='font-size: 200%; color: red;'>&lt;</font>");
    return input;
}

document.querySelectorAll("cppblock").forEach(function(block)
{
    console.log(block.textContent);
    //console.log( convertHTMLSpecialCharacters(block.innerHTML) );
    block.innerHTML = trimSpaces(convertHTMLSpecialCharacters( block.innerHTML) );
});