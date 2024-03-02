document.addEventListener("DOMContentLoaded", function() {
    var lastMatchIndex = -1;

    document.getElementById('searchButton').addEventListener('click', function() {
        var searchQuery = document.getElementById('searchInput').value;
        search(searchQuery);
    });

    function search(keyword) {
        var content = document.getElementById('content');
        var paragraphs = content.getElementsByTagName('p');
        var found = false;

        var regex = new RegExp(keyword, 'gi');

        for (var i = lastMatchIndex + 1; i < paragraphs.length; i++) {
            var paragraphContent = paragraphs[i].textContent;
            var matches = paragraphContent.match(regex);

            if (matches) {
                found = true;
                paragraphs[i].innerHTML = paragraphContent;

                var highlightedContent = paragraphContent.replace(regex, function(match) {
                    return '<span class="highlight">' + match + '</span>';
                });
                paragraphs[i].innerHTML = highlightedContent;

                var matchesInParagraph = paragraphs[i].getElementsByClassName('highlight');
                for (var j = 0; j < matchesInParagraph.length; j++) {
                    matchesInParagraph[j].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                lastMatchIndex = i; 
                break; 
            }
        }

        if (!found) {
            alert('No more matches found');
            lastMatchIndex = -1; 
        }
    }
});
