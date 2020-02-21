import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { fasCheck, fasTimes } from "@rinminase/ng-fortawesome";
import Swal from "sweetalert2";

@Component({
	selector: "app-add-title",
	templateUrl: "./add-title.component.html",
	styleUrls: ["./add-title.component.scss"],
})
export class AddTitleComponent implements OnInit {
	fasCheck = fasCheck;
	fasTimes = fasTimes;

	constructor(private modal: NgbActiveModal) {}

	ngOnInit() {}

	cancel() {
		Swal.fire({
			title: "Are you sure?",
			text: "This will discard your edits",
			icon: "question",
			showCancelButton: true,
		}).then((result) => {
			if (result.value) {
				this.modal.dismiss();
			}
		});
	}
}
