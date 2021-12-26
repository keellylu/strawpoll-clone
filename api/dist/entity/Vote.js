"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const typeorm_1 = require("typeorm");
const Choice_1 = require("./Choice");
const Poll_1 = require("./Poll");
let Vote = class Vote extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Vote.prototype, "pollId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Poll_1.Poll),
    __metadata("design:type", Poll_1.Poll)
], Vote.prototype, "poll", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Vote.prototype, "choiceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Choice_1.Choice),
    __metadata("design:type", Choice_1.Choice)
], Vote.prototype, "choice", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Vote.prototype, "ipAddress", void 0);
Vote = __decorate([
    (0, typeorm_1.Entity)()
], Vote);
exports.Vote = Vote;
//# sourceMappingURL=Vote.js.map