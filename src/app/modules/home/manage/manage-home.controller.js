import _ from "lodash";
// import Fuse from "fuse.js";
import moment from "moment";

export class ManageHomeController {
	constructor (
		$log,
		$scope,
		$uibModal,
		$window,
		firebase
	) {
		"ngInject";

		_.extend(this, {
			$log,
			$scope,
			$uibModal,
			$window,
			firebase,
			dataLoaded: false,
		});

		_.extend(this.$scope, {
			search: "",
		});

		this.activate();
	}

	activate() {
		this.firebase.auth()
			.then(() => {
				this.firebase.retrieve()
					.then((data) => {
						this.formatData(data);

						this.data = data;
						this.dataLoaded = true;
						this.$scope.$apply();
					});
			}).catch(() => {
				this.$window.location.href = "/login";
			});

		// this.$scope.$watch(
		// 	() => this.$scope.search,
		// 	() => {
		//
		// 		if (this.data) {
		// 			const fuseOptions = {
		// 				shouldSort: true,
		// 				threshold: 0.3,
		// 				location: 0,
		// 				distance: 100,
		// 				maxPatternLength: 64,
		// 				minMatchCharLength: 0,
		// 				keys: [
		// 					"title",
		// 					// "quality",
		// 					// "releaseSeason",
		// 					// "releaseYear",
		// 					// "encoder",
		// 					// "variants",
		// 					// "remarks",
		// 				],
		// 			};
		//
		// 			this.filteredData = new Fuse(this.data, fuseOptions)
		// 				.search(this.$scope.search);
		// 		// } else if (this.data) {
		// 		// 	this.filteredData = this.data.map((data) => Object.create(data));
		// 		// 	this.data = angular.copy(this.unsearchedData);
		// 		}
		//
		// 	}
		// );
	}

	formatData(data) {
		return data.map((value) => {
			const filesize = parseFloat(value.filesize);

			if (filesize === 0) {
				value.filesize = "-";
			} else if (filesize < 1073741824) {
				value.filesize = `${(filesize / 1048576).toFixed(2)} MB`;
			} else {
				value.filesize = `${(filesize / 1073741824).toFixed(2)} GB`;
			}

			value.dateFinished = moment.unix(value.dateFinished)
				.format("MMM DD, YYYY");

			delete value.duration;
			delete value.firstSeasonTitle;
			delete value.inhdd;
			delete value.offquel;
			delete value.prequel;
			delete value.rating;
			delete value.seasonNumber;
			delete value.sequel;
			delete value.watchStatus;
		});
	}

	addTitle() {
		this.$uibModal.open({
			templateUrl: "app/modules/home/add/add-home.html",
			controller: "AddHomeController",
			controllerAs: "vm",
			backdrop: "static",
		});
	}
}
