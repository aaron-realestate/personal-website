function showabout() {
  $("#about_container").css("display", "inherit");
  $("#about_container").addClass("animated slideInLeft");
  setTimeout(function () {
    $("#about_container").removeClass("animated slideInLeft");
  }, 800);
}
function closeabout() {
  $("#about_container").addClass("animated slideOutLeft");
  setTimeout(function () {
    $("#about_container").removeClass("animated slideOutLeft");
    $("#about_container").css("display", "none");
  }, 800);
}
function showwork() {
  $("#work_container").css("display", "inherit");
  $("#work_container").addClass("animated slideInLeft");
  setTimeout(function () {
    $("#work_container").removeClass("animated slideInLeft");
  }, 800);
}
function closework() {
  $("#work_container").addClass("animated slideOutLeft");
  setTimeout(function () {
    $("#work_container").removeClass("animated slideOutLeft");
    $("#work_container").css("display", "none");
  }, 800);
}

function showintel() {
  $("#intel_container").css("display", "inherit");
  $("#intel_container").addClass("animated slideInRight");
  setTimeout(function () {
    $("#intel_container").removeClass("animated slideInRight");
  }, 800);
}
function closeintel() {
  $("#intel_container").addClass("animated slideOutRight");
  setTimeout(function () {
    $("#intel_container").removeClass("animated slideOutRight");
    $("#intel_container").css("display", "none");
  }, 800);
}

function showcontact() {
  $("#contact_container").css("display", "inherit");
  $("#contact_container").addClass("animated slideInUp");
  setTimeout(function () {
    $("#contact_container").removeClass("animated slideInUp");
  }, 800);
}
function closecontact() {
  $("#contact_container").addClass("animated slideOutDown");
  setTimeout(function () {
    $("#contact_container").removeClass("animated slideOutDown");
    $("#contact_container").css("display", "none");
  }, 800);
}
setTimeout(function () {
  $("#loading").addClass("animated fadeOut");
  setTimeout(function () {
    $("#loading").removeClass("animated fadeOut");
    $("#loading").css("display", "none");
    $("#box").css("display", "none");
    $("#about").removeClass("animated fadeIn");
    $("#contact").removeClass("animated fadeIn");
    $("#work").removeClass("animated fadeIn");
  }, 1000);
}, 1500);

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");

  if (section === "intel" && typeof showintel === "function") {
    showintel();
  }
});
$(document).ready(function () {
  // Tab toggle logic (keep as is)
  $("#headlines_btn").on("click", function () {
    $(this).addClass("active");
    $("#briefs_btn").removeClass("active");
    $("#headlines_section").show();
    $("#briefs_section").hide();
  });

  $("#briefs_btn").on("click", function () {
    $(this).addClass("active");
    $("#headlines_btn").removeClass("active");
    $("#briefs_section").show();
    $("#headlines_section").hide();
  });

  // PDF.js viewer code
  const url = "resources/pdfs/June.25 Issue.pdf";

  let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

  const scale = 1.2;
  const canvas = document.getElementById("pdf-render");
  const ctx = canvas.getContext("2d");

  // Render the page
  function renderPage(num) {
    pageIsRendering = true;

    pdfDoc.getPage(num).then((page) => {
      const viewport = page.getViewport({ scale: scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderCtx = {
        canvasContext: ctx,
        viewport: viewport,
      };

      const renderTask = page.render(renderCtx);

      renderTask.promise.then(() => {
        pageIsRendering = false;

        if (pageNumIsPending !== null) {
          renderPage(pageNumIsPending);
          pageNumIsPending = null;
        }
      });

      // Update page counters in new format
      $("#pdf-current-page").text(num);
    });
  }

  // Check for pages rendering and queue next page if needed
  function queueRenderPage(num) {
    if (pageIsRendering) {
      pageNumIsPending = num;
    } else {
      renderPage(num);
    }
  }

  // Show Prev Page
  $("#pdf-prev").on("click", () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
  });

  // Show Next Page
  $("#pdf-next").on("click", () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
  });

  // Fullscreen toggle for PDF container
  $("#pdf-fullscreen").on("click", () => {
    const elem = document.getElementById("pdf-viewer-container");
    if (!document.fullscreenElement) {
      elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  // Load the PDF document
  pdfjsLib
    .getDocument(url)
    .promise.then((pdfDoc_) => {
      pdfDoc = pdfDoc_;
      $("#pdf-total-pages").text(pdfDoc.numPages);
      renderPage(pageNum);
    })
    .catch((err) => {
      $("#headlines_section").html(`<p>Error loading PDF: ${err.message}</p>`);
    });
});
