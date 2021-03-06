(function() {
    "use strict";
    var body = document.getElementById('content');
    var navigation = document.getElementById('navigation').innerHTML;
    
    function ajaxGet(url) {
        return new Promise(function(resolve, reject) {
            var httpRequest = new XMLHttpRequest();

            if (!httpRequest) {
                alert('Your browser is not supported. Please upgrade.');
                reject(Error('Browser not supported.'));
                return false;
            }

            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        resolve(httpRequest.responseText);
                    } else {
                        resolve('<p>Unable to process the request.</p>');
                    }
                }
            };
            httpRequest.open('GET', url);
            httpRequest.send();
        });
    }

    function createContinueButton(label, shortcut, action, removable) {
        var btn = createElement('button', 'button-continue');
        btn.innerHTML = '<span>' + label + '</span><span>' + shortcut + '</span>';
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            action();
        });

        btn.remove = function() {
            if (removable) container.parentNode.removeChild(container);
        };

        var container = createElement('div', 'button-continue-container');
        container.appendChild(btn);

        return container;
    }

    function createElement(name, classes) {
        var el = document.createElement(name);
        if (classes) el.className = classes;
        return el;
    }

    function getPosition() {
        var container = document.getElementById('content');
        var page = container.querySelector('.lesson-page.active');
        var pages = container.querySelectorAll('.lesson-page');
        var pageIndex;
        var i;

        for (i = 0; i < pages.length; i++) {
            if (pages[i] === page) {
                pageIndex = i;
                break;
            }
        }

        var result = {
            page: pageIndex || 0,
            pages: pages.length,
            section: page
                ? page.querySelectorAll('.lesson-page-section.visible').length - 1
                : 0,
            sections: page
                ? page.querySelectorAll('.lesson-page-section').length
                : 0
        };
        if (result.section < 0) result.section = 0;
        return result;
    }

    function navigateTo(page, section) {
        var btn;
        var i;
        var visible;

        // update active page
        var container = document.getElementById('content');
        var pages = container.querySelectorAll('.lesson-page');
        for (i = 0; i < pages.length; i++) {
            toggleClass(pages[i], 'active', i === page);
        }

        // update visible sections
        if (pages[page] && section !== undefined) {
            var sections = pages[page].querySelectorAll('.lesson-page-section');
            for (i = 0; i < sections.length; i++) {
                visible = i <= section;
                toggleClass(sections[i], 'visible', visible);
                if (i > 0 && visible) {
                    btn = sections[i - 1].querySelector('.button-continue');
                    if (btn) btn.remove();
                }
            }
        }

        // update page number on pagination
        var pagination = document.querySelector('.lesson-heading-page');
        pagination.innerHTML = (page + 1) + ' / ' + pages.length;
    }

    navigateTo.previousPage = function() {
        const pos = getPosition();
        if (pos.page > 0) {
            navigateTo(pos.page - 1);
            updateHistory(pos.page - 1);
            top();
        }
    };

    navigateTo.previousSection = function() {
        const pos = getPosition();
        if (pos.section > 0) navigateTo(pos.page, pos.section - 1);
    };

    navigateTo.nextPage = function() {
        const pos = getPosition();
        if (pos.page < pos.pages - 1) {
            navigateTo(pos.page, pos.sections - 1);
            navigateTo(pos.page + 1);
            updateHistory(pos.page + 1);
            top();
        }
    };

    navigateTo.nextSection = function() {
        const pos = getPosition();
        if (pos.section < pos.sections - 1) navigateTo(pos.page, pos.section + 1);
    };

    function processContent(content) {
        var frag = document.createElement('div');
        frag.innerHTML = content;

        var container = createElement('div', 'lesson');
        var heading = createElement('div', 'lesson-heading');

        var pages = createElement('div', 'lesson-pages');
        container.appendChild(heading);
        container.appendChild(pages);

        var active = heading;
        var child;
        var page;

        while (frag.firstChild) {
            child = frag.firstChild;
            if (child.tagName === 'H2') {
                page = createElement('div', 'lesson-page');
                page.appendChild(child);
                active = page;
                pages.appendChild(active);
            } else {
                active.appendChild(child);
            }
        }

        var i = 0;
        for (i = 0; i < pages.children.length; i++) processPage(pages.children[i], i + 1 === pages.children.length);

        // add pagination to the header
        var paginate = createElement('div', 'lesson-heading-paginate');
        var prev = createElement('button');
        prev.addEventListener('click', navigateTo.previousPage);
        prev.innerHTML = '&lt;';
        var next = createElement('button');
        next.addEventListener('click', navigateTo.nextPage);
        next.innerHTML = '&gt;';
        var status = createElement('div', 'lesson-heading-page');
        heading.appendChild(paginate);
        paginate.appendChild(prev);
        paginate.appendChild(status);
        paginate.appendChild(next);
        status.innerHTML = '1 / ' + pages.children.length;

        return container;
    }

    function processPage(page, isLastPage) {
        var btn;
        var i;

        // move any breaks outside of child elements
        var brs = page.querySelectorAll('br');
        var br;
        var parent;
        for (i = 0; i < brs.length; i++) {
            br = brs[i];
            while (br.parentNode !== page) {
                parent = br.parentNode;
                br = parent.parentNode.insertBefore(br, parent.nextSibling);
            }
        }

        // build sections
        var sections = createElement('div', 'lesson-page-sections');
        var section = createElement('div', 'lesson-page-section');
        sections.appendChild(section);
        while (page.firstChild) {
            if (page.firstChild.tagName === 'BR') {

                // add a button to the last section
                btn = createContinueButton('Continue', 'Ctrl + Down', navigateTo.nextSection, true);
                section.append(btn);

                section = createElement('div', 'lesson-page-section');
                sections.appendChild(section);
                page.removeChild(page.firstChild);
            } else {
                section.appendChild(page.firstChild);
            }
        }

        // add a button to the last section
        if (isLastPage) {
            btn = createContinueButton('Lesson Completed', 'Ctrl + H', function() {
                window.location.href = '/';
            }, false);
        } else {
            btn = createContinueButton('Next Page', 'Right', navigateTo.nextPage, false);
        }
        section.append(btn);

        // move sections into page
        page.appendChild(sections);
    }

    function toggleClass(el, className, enable) {
        var classes = el.className.split(/\s+/);
        var index = classes.indexOf(className);
        if (index === -1 && enable !== false) {
            classes.push(className);
        } else if (index >= 0 && enable !== true) {
            classes.splice(index, 1);
        }
        el.className = classes.join(' ');
    }

    function top() {
        setTimeout(function() {
            window.scrollTo(0, 0);
        });
    }
    
    function transitionToElement(el) {
        body.innerHTML = '';
        if (el) body.appendChild(el);
    }

    function updateContent() {
        var ar = window.location.pathname.split('/');
        var lesson = ar[1];
        var instruction = document.getElementById('instruction');
        
        if (!lesson) {
            var el = createElement('div', 'lesson navigation');
            el.innerHTML = navigation;
            transitionToElement(el);
        } else {
            transitionToElement(null);
            ajaxGet('/lessons/' + lesson + '.html')
                .then(function(html) {
                    var el = processContent(html);
                    transitionToElement(el);

                    var page = parseInt(ar[2]) || 1;
                    navigateTo(page - 1, 0);
                    updateHistory(page - 1);
                    top();
                });
        }
    }

    function updateHistory(page) {
        var urlParts = window.location.pathname.split('/');
        if (parseInt(urlParts[2]) !== page + 1) {
            urlParts[2] = page + 1;
            history.pushState({}, '', urlParts[1] + '/' + (page + 1));
        }
    }

    window.addEventListener('keydown', function(e) {
        var pos;
        switch (e.which) {
            case 32: // space
                e.preventDefault();
                navigateTo.nextSection();
                break;
            case 37: // left
                navigateTo.previousPage();
                break;
            case 38: // up
                if (e.ctrlKey) {
                    e.preventDefault();
                    navigateTo.previousSection();
                }
                break;
            case 39: // right
                pos = getPosition();
                if (pos.sections === pos.section + 1 || e.ctrlKey) {
                    navigateTo.nextPage();
                }
                break;
            case 40: // down
                if (e.ctrlKey) {
                    e.preventDefault();
                    navigateTo.nextSection();
                }
                break;
            case 72: // H
                if (e.ctrlKey) {
                    e.preventDefault();
                    window.location.href = '/';
                }
        }
    });

    window.onpopstate = function (event) {
        var ar = window.location.pathname.split('/');
        var lesson = ar[1];
        var page = ar[2] ? parseInt(ar[2]) - 1 : 0;
        navigateTo(page);
    };

    updateContent();
})();