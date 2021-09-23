const app = (function () {
    let author;
    let blueprintList;
    function putNameAuthorBlueprints() {
        
    }
    function getNameAuthorBlueprints() {
        author = $("#author").val();
        if (author === "") {
            alert("Debe ingresar un nombre !");
        } else {
            apimock.getBlueprintsByAuthor(author, (req, resp) => {
                dataToHtml(resp);
            });
        }
    }

    function dataToHtml(data) {
        $("#table-blueprints tbody").empty();

        if (data === undefined) {
            alert("No existe el autor!");
            $("#author-name").empty();
            $("#user-points").empty();
        } else {
            getName();
            const datanew = data.map((elemento) => {
                return {
                    name: elemento.name,
                    puntos: elemento.points.length
                }
            });

            datanew.map((elementos) => {
                $("#table-blueprints > tbody:last").append($("<tr><td>" + elementos.name + "</td><td>" + elementos.puntos.toString() +
                    "</td><td>" + "<button  id=" + elementos.name + " onclick=app.getBlueprintByAuthorAndName(this)>open</button>" + "</td>"));
            });

            const totalPuntos = datanew.reduce((suma, {puntos}) => suma + puntos, 0);

            $("#user-points").text(totalPuntos);
        }
    }
})();

