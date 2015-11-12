$(document).ready(function () {
    $('.fancybox').fancybox({
        padding: 7,
        openEffect: 'elastic'
    });

    var dataTable = $('#log-tl-table-viewer').DataTable({
        responsive: true,
        fixedHeader: {
            header: true,
            headerOffset: 49
        },
        paginate: false
    });

    $("#filter-search-box").keyup(function () {
        dataTable.search(this.value).draw();
    });
});