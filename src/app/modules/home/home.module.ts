import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

import { LegendModule } from "@components/legend/legend.module";
import { ManageHomeComponent } from "./manage-home/manage-home.component";
import { ViewHomeComponent } from "./view-home/view-home.component";
import { AddHomeComponent } from "./add-home/add-home.component";
import { UpdateHomeComponent } from "./update-home/update-home.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [{
	path: "",
	component: HomeComponent,
	children: [{
		path: "",
		component: ManageHomeComponent,
	}, {
		path: "view/:id",
		component: ViewHomeComponent,
	}],
}];

@NgModule({
	declarations: [
		HomeComponent,
		ManageHomeComponent,
		ViewHomeComponent,
		AddHomeComponent,
		UpdateHomeComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		NgbModalModule,

		LegendModule,
	],
	entryComponents: [
		AddHomeComponent,
		UpdateHomeComponent,
	],
})
export class HomeModule { }
