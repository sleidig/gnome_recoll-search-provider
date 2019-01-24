/*
 * Recoll Search Provider
 * Search your Recoll notes from GNOME Shell.
 *
 * Copyright (C) 2019
 *     Sebastian Leidig <sebastian.leidig@gmail.com
 *
 * based on Sample Search Provider 
 *     https://github.com/sleidig/gnome_sample-search-provider
 *
 * This file is part of Recoll Search Provider
 *
 * Recoll Search Provider is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Recoll Search Provider is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gnome-shell-extension-openweather.
 * If not, see <http://www.gnu.org/licenses/>.
  */

const GLib = imports.gi.GLib;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Base64 = Extension.imports.base64.Base64;



class RecollSearchClient {
    constructor() {
        
    }


    /**
     * Query search results and return them through a callback.
     * @param searchterm {string} text entered by the user for searching
     * @param callback {function(error, results)} return results asyncronously by calling this callback,
     *                 error {string} error message or null if no error
     *                 results {object[]} array of result items each defining the following attributes:
     *                         id {string}
     *                         name {string}
     *                         description {string}
     *                         url
     */
    get(searchterm, callback) {
        let resultData = GLib.spawn_command_line_sync('recoll -t -n 10 -F "filename title abstract url" -q "' + searchterm + '"')[1].toString();
	resultData = resultData.replace(/\n$/g, ''); // remove newlines at end of result
	let rawResults = resultData.split('\n').slice(2);

        const results = this._parseResults(rawResults);
        callback(null, results);
    }

    _parseResults(rawResultsArray) {
        let parsedResults = [];

        rawResultsArray.forEach((item, index) => {
            const resultAttributes = item.toString().split(' ');
            const rName = Base64.decode(resultAttributes[0]);
            const rDescr = Base64.decode(resultAttributes[1]);
            const rAbstract = Base64.decode(resultAttributes[2]);
            const rUrl = Base64.decode(resultAttributes[3]);

            let resultObject = {
                id: 'recoll_'+index,
                name: rName,
                description: rDescr + ' ' + rAbstract,
                url: rUrl
            };
            parsedResults.push(resultObject);
        });

        return parsedResults;
    }



    destroy() {
        
    }
}



/**
 * Factory function called by extension.js to get an instance of a SearchClient.
 * @returns {SearchClient} instance of a SearchClient implementation providing the following methods:
 *             get(searchterm, callback)
 *             destroy()
 */
function getSearchClient() {
    return new RecollSearchClient();
}
