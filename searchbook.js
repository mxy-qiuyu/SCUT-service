// JavaScript Document
var page = 0;
var book;

$(function(){
	$("#search").click(function(){
		var searchBook = $("#searchBook").val();
		searchBook = searchBook.replace(/(^\s+)|(\s+$)/g, "");
		if (searchBook == "")
			return;
		book = searchBook;
		doSearch(0);
	});
});

function doSearch(goPage){
	$.post("searchbook_catch.php?&t=" + Math.random(),
	{
		name:book,
		page:goPage
	},
	function(data){
		$('#bookList tbody').html(data.result);
		page = goPage;
		switch (data.status){
			case "none":
				alert("找不到相关书籍");
				$(".pager li").attr("class","disabled");
				$(".pager li").attr("onclick", "");
				break;
			case "all":
				$(".pager li").attr("class","disabled");
				$(".pager li").attr("onclick", "");
				break;
			case "first":
				$("#previous").attr("class","disabled");
				$("#next").attr("class","");
				$("#previous").attr("onclick", "");
				$("#next").attr("onclick", "doSearch(page + 1);");
				break;
			case "last":
				$("#previous").attr("class","");
				$("#next").attr("class","disabled");
				$("#previous").attr("onclick", "doSearch(page - 1);");
				$("#next").attr("onclick", "");
				break;
			case "nomal":
				$("#previous").attr("class","");
				$("#next").attr("class","");
				$("#previous").attr("onclick", "doSearch(page - 1);");
				$("#next").attr("onclick", "doSearch(page + 1);");
		}
		$(".book").click(function(){
			bookDetail($(this));
		});
	},
	"json");
}

function bookDetail($book){
	var title = $book.find("#title").html();
	var id = $book.find("#id").html();
	var author = $book.find("#author").html();
	var press = $book.find("#press").html();
	var year = $book.find("#year").html();
	var callno = $book.find("#callno").html();
	//	alert(id);
	$("#modalTitle").html(title);
	$("#detail_id").html("书目id：" + id);
	$("#detail_author").html("作者：" + author);
	$("#detail_press").html("出版社：" + press);
	$("#detail_year").html("年份：" + year);
	$("#detail_callno").html("索书号：" + callno);
	
	$.get("searchbook_detail.php?id=" + id,
	function(data){
		$('#detail_name').html("书名：" + data.name);
		$('#detail_status tbody').html(data.status);
	},
	"json");
}

