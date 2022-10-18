(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "name",
            alias: "Guide Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "guide_id",
            alias: "Guide ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "username",
            alias: "username",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "state",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "PendoGuideFeed",
            alias: "List of Pendo Guides",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://app.pendo.io/api/v1/guide?content-type&=application/json&x-pendo-integration-key=84e57b87-0c59-486f-6289-2a517d39b078.us", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "name": feat[i].name,
                    "guide_id": feat[i].id,
                    "username": feat[i].createdByUser.username,
                    "state": feat[i].state
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();
$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Pendo Guide List Feed";
        tableau.submit();
    });
});
