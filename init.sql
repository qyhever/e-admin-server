/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : e_admin

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 18/10/2019 17:02:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `nationId` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `countryId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `nationId`(`nationId`) USING BTREE,
  INDEX `countryId`(`countryId`) USING BTREE,
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`nationId`) REFERENCES `country` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `city_ibfk_2` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES (1, '北京', 1, '2019-09-19 19:06:52', '2019-09-19 19:06:52', NULL);
INSERT INTO `city` VALUES (2, '上海', 1, '2019-09-19 19:07:01', '2019-09-19 19:07:01', NULL);
INSERT INTO `city` VALUES (3, '广州', 1, '2019-09-19 19:07:07', '2019-09-19 19:07:07', NULL);
INSERT INTO `city` VALUES (4, '东京', 2, '2019-09-19 19:07:18', '2019-09-19 19:07:18', NULL);
INSERT INTO `city` VALUES (5, '大阪', 2, '2019-09-19 19:07:22', '2019-09-19 19:07:22', NULL);
INSERT INTO `city` VALUES (6, '广岛', 2, '2019-09-19 19:07:29', '2019-09-19 19:07:29', NULL);
INSERT INTO `city` VALUES (7, '首尔', 3, '2019-09-19 19:07:39', '2019-09-19 19:07:39', NULL);
INSERT INTO `city` VALUES (8, '釜山', 3, '2019-09-19 19:07:44', '2019-09-19 19:07:44', NULL);
INSERT INTO `city` VALUES (9, '华盛顿', 4, '2019-09-19 19:07:55', '2019-09-19 19:07:55', NULL);
INSERT INTO `city` VALUES (10, '纽约', 4, '2019-09-19 19:07:58', '2019-09-19 19:07:58', NULL);
INSERT INTO `city` VALUES (11, '旧金山', 4, '2019-09-19 19:08:03', '2019-09-19 19:08:03', NULL);
INSERT INTO `city` VALUES (12, '温哥华', 5, '2019-09-19 19:08:13', '2019-09-19 19:08:13', NULL);
INSERT INTO `city` VALUES (13, '多伦多', 5, '2019-09-19 19:08:16', '2019-09-19 19:08:16', NULL);
INSERT INTO `city` VALUES (14, '墨西哥城', 6, '2019-09-19 19:08:28', '2019-09-19 19:08:28', NULL);
INSERT INTO `city` VALUES (15, '伦敦', 7, '2019-09-19 19:08:39', '2019-09-19 19:08:39', NULL);
INSERT INTO `city` VALUES (16, '牛津', 7, '2019-09-19 19:08:47', '2019-09-19 19:08:47', NULL);
INSERT INTO `city` VALUES (17, '莫斯科', 8, '2019-09-19 19:09:00', '2019-09-19 19:09:00', NULL);
INSERT INTO `city` VALUES (18, '圣彼得堡', 8, '2019-09-19 19:09:23', '2019-09-19 19:09:23', NULL);
INSERT INTO `city` VALUES (19, '巴黎', 9, '2019-09-19 19:09:35', '2019-09-19 19:09:35', NULL);

-- ----------------------------
-- Table structure for continent
-- ----------------------------
DROP TABLE IF EXISTS `continent`;
CREATE TABLE `continent`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of continent
-- ----------------------------
INSERT INTO `continent` VALUES (1, '亚洲', '2019-09-19 18:53:41', '2019-09-19 18:53:41');
INSERT INTO `continent` VALUES (2, '北美洲', '2019-09-19 18:53:51', '2019-09-19 18:53:51');
INSERT INTO `continent` VALUES (3, '欧洲', '2019-09-19 18:53:55', '2019-09-19 18:53:55');

-- ----------------------------
-- Table structure for country
-- ----------------------------
DROP TABLE IF EXISTS `country`;
CREATE TABLE `country`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `continentId` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of country
-- ----------------------------
INSERT INTO `country` VALUES (1, '中国', 1, '2019-09-19 18:54:28', '2019-09-19 18:54:28');
INSERT INTO `country` VALUES (2, '日本', 1, '2019-09-19 18:54:44', '2019-09-19 18:54:44');
INSERT INTO `country` VALUES (3, '韩国', 1, '2019-09-19 18:54:48', '2019-09-19 18:54:48');
INSERT INTO `country` VALUES (4, '美国', 2, '2019-09-19 18:54:54', '2019-09-19 18:54:54');
INSERT INTO `country` VALUES (5, '加拿大', 2, '2019-09-19 18:54:58', '2019-09-19 18:54:58');
INSERT INTO `country` VALUES (6, '墨西哥', 2, '2019-09-19 18:55:02', '2019-09-19 18:55:02');
INSERT INTO `country` VALUES (7, '英国', 3, '2019-09-19 18:55:07', '2019-09-19 18:55:07');
INSERT INTO `country` VALUES (8, '俄罗斯', 3, '2019-09-19 18:55:11', '2019-09-19 18:55:11');
INSERT INTO `country` VALUES (9, '法国', 3, '2019-09-19 18:55:17', '2019-09-19 18:55:17');

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES (1, '九一班', '2019-09-19 14:15:57', '2019-09-19 14:22:02');
INSERT INTO `grade` VALUES (2, '九二班', '2019-09-19 14:16:10', '2019-09-19 14:22:16');
INSERT INTO `grade` VALUES (3, '九三班', '2019-09-19 14:16:21', '2019-09-19 14:22:23');

-- ----------------------------
-- Table structure for grade_teacher_relation
-- ----------------------------
DROP TABLE IF EXISTS `grade_teacher_relation`;
CREATE TABLE `grade_teacher_relation`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gradeId` int(11) NULL DEFAULT NULL,
  `teacherId` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `gradeId`(`gradeId`) USING BTREE,
  INDEX `teacherId`(`teacherId`) USING BTREE,
  CONSTRAINT `grade_teacher_relation_ibfk_1` FOREIGN KEY (`gradeId`) REFERENCES `grade` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `grade_teacher_relation_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grade_teacher_relation
-- ----------------------------
INSERT INTO `grade_teacher_relation` VALUES (1, 1, 1, '2019-09-20 17:15:56', '2019-09-20 17:15:56');
INSERT INTO `grade_teacher_relation` VALUES (2, 2, 1, '2019-09-20 17:16:00', '2019-09-20 17:16:00');
INSERT INTO `grade_teacher_relation` VALUES (3, 3, 1, '2019-09-20 17:16:04', '2019-09-20 17:16:04');
INSERT INTO `grade_teacher_relation` VALUES (6, 1, 2, '2019-09-20 17:16:44', '2019-09-20 17:16:44');
INSERT INTO `grade_teacher_relation` VALUES (7, 1, 3, '2019-09-20 17:16:46', '2019-09-20 17:16:46');
INSERT INTO `grade_teacher_relation` VALUES (8, 2, 4, '2019-09-20 17:16:52', '2019-09-20 17:16:52');
INSERT INTO `grade_teacher_relation` VALUES (9, 2, 5, '2019-09-20 17:16:56', '2019-09-20 17:16:56');
INSERT INTO `grade_teacher_relation` VALUES (10, 3, 3, '2019-09-20 17:17:01', '2019-09-20 17:17:01');

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '权限编码',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '2' COMMENT '目录 1 资源 2',
  `enable` tinyint(1) NULL DEFAULT 1 COMMENT '启用 1 禁用 0',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES (1, NULL, '后台管理系统', 'root', '1', 1, '2019-10-03 14:51:40', '2019-10-07 15:17:16');
INSERT INTO `resource` VALUES (3, 'root', '组件', 'component', '1', 1, '2019-10-06 16:23:56', '2019-10-18 16:21:15');
INSERT INTO `resource` VALUES (4, 'component', '复制', 'clipboard', '2', 1, '2019-10-06 16:25:08', '2019-10-18 12:00:18');
INSERT INTO `resource` VALUES (5, 'component', '二维码', 'qrcode', '2', 1, '2019-10-06 16:25:26', '2019-10-06 16:25:26');
INSERT INTO `resource` VALUES (6, 'root', '账号管理', 'user', '2', 1, '2019-10-06 16:25:45', '2019-10-14 14:25:26');
INSERT INTO `resource` VALUES (7, 'root', '角色管理', 'role', '2', 1, '2019-10-06 16:25:58', '2019-10-14 14:25:33');
INSERT INTO `resource` VALUES (8, 'root', '权限管理', 'resource', '2', 1, '2019-10-06 16:27:39', '2019-10-14 14:25:41');
INSERT INTO `resource` VALUES (9, 'root', 'admin页面', 'adminPage', '2', 1, '2019-10-06 17:50:53', '2019-10-06 17:50:53');
INSERT INTO `resource` VALUES (10, 'root', 'dev页面', 'devPage', '2', 1, '2019-10-06 17:51:08', '2019-10-06 17:51:08');
INSERT INTO `resource` VALUES (11, 'root', 'guest页面', 'guestPage', '2', 1, '2019-10-06 17:51:28', '2019-10-06 17:51:28');
INSERT INTO `resource` VALUES (12, 'root', 'test页面', 'testPage', '2', 1, '2019-10-06 17:51:38', '2019-10-06 18:08:58');
INSERT INTO `resource` VALUES (13, 'root', 'operation页面', 'operationPage', '2', 1, '2019-10-06 17:51:54', '2019-10-18 11:59:16');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', '平台所有权限', '2019-10-03 13:37:10', '2019-10-14 21:39:35');
INSERT INTO `role` VALUES (2, '开发者', '开发人员', '2019-10-03 13:43:47', '2019-10-18 15:07:04');
INSERT INTO `role` VALUES (3, '测试', '测试人员', '2019-10-03 13:45:12', '2019-10-14 15:13:43');
INSERT INTO `role` VALUES (4, '运营', '运营人员', '2019-10-10 22:15:35', '2019-10-14 15:13:33');
INSERT INTO `role` VALUES (5, '游客', '游客角色', '2019-10-18 15:40:41', '2019-10-18 16:06:41');

-- ----------------------------
-- Table structure for role_resource_relation
-- ----------------------------
DROP TABLE IF EXISTS `role_resource_relation`;
CREATE TABLE `role_resource_relation`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NULL DEFAULT NULL,
  `resourceId` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 77 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_resource_relation
-- ----------------------------
INSERT INTO `role_resource_relation` VALUES (24, 4, 1, '2019-10-14 15:13:33', '2019-10-14 15:13:33');
INSERT INTO `role_resource_relation` VALUES (25, 4, 13, '2019-10-14 15:13:33', '2019-10-14 15:13:33');
INSERT INTO `role_resource_relation` VALUES (26, 3, 1, '2019-10-14 15:13:43', '2019-10-14 15:13:43');
INSERT INTO `role_resource_relation` VALUES (27, 3, 12, '2019-10-14 15:13:43', '2019-10-14 15:13:43');
INSERT INTO `role_resource_relation` VALUES (54, 1, 1, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (55, 1, 2, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (56, 1, 3, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (57, 1, 4, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (58, 1, 5, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (59, 1, 6, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (60, 1, 7, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (61, 1, 8, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (62, 1, 9, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (63, 1, 10, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (64, 1, 11, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (65, 1, 12, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (66, 1, 13, '2019-10-14 21:39:35', '2019-10-14 21:39:35');
INSERT INTO `role_resource_relation` VALUES (71, 2, 1, '2019-10-18 15:07:04', '2019-10-18 15:07:04');
INSERT INTO `role_resource_relation` VALUES (72, 2, 10, '2019-10-18 15:07:04', '2019-10-18 15:07:04');
INSERT INTO `role_resource_relation` VALUES (75, 5, 1, '2019-10-18 16:06:41', '2019-10-18 16:06:41');
INSERT INTO `role_resource_relation` VALUES (76, 5, 11, '2019-10-18 16:06:41', '2019-10-18 16:06:41');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `sex` enum('0','1') CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '0',
  `gradeId` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `gradeId`(`gradeId`) USING BTREE,
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`gradeId`) REFERENCES `grade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, '张伟', '0', 1, '2019-09-19 14:23:33', '2019-09-19 14:23:33');
INSERT INTO `student` VALUES (2, '刘洋', '1', 1, '2019-09-19 14:23:46', '2019-09-19 14:23:46');
INSERT INTO `student` VALUES (3, '王芳', '0', 1, '2019-09-19 14:23:59', '2019-09-19 14:23:59');
INSERT INTO `student` VALUES (4, '程雨', '0', 2, '2019-09-19 14:24:26', '2019-09-19 14:24:26');
INSERT INTO `student` VALUES (5, '张玲', '0', 2, '2019-09-19 14:24:32', '2019-09-19 14:24:32');
INSERT INTO `student` VALUES (6, '孙旭', '1', 2, '2019-09-19 14:24:45', '2019-09-19 14:24:45');
INSERT INTO `student` VALUES (7, '赵兴', '1', 3, '2019-09-19 14:25:06', '2019-09-19 14:25:06');
INSERT INTO `student` VALUES (8, '周鸿', '1', 3, '2019-09-19 14:25:32', '2019-09-19 14:25:32');
INSERT INTO `student` VALUES (9, '雷冲', '0', 3, '2019-09-19 14:25:44', '2019-09-19 14:25:44');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (1, '徐阶', 20, '2019-09-20 16:31:34', '2019-09-20 16:31:34');
INSERT INTO `teacher` VALUES (2, '高拱', 21, '2019-09-20 16:31:43', '2019-09-20 16:31:43');
INSERT INTO `teacher` VALUES (3, '张居正', 18, '2019-09-20 16:31:51', '2019-09-20 16:31:51');
INSERT INTO `teacher` VALUES (4, '申时行', 22, '2019-09-20 16:32:08', '2019-09-20 16:32:08');
INSERT INTO `teacher` VALUES (5, '孙承宪', 26, '2019-09-20 16:32:27', '2019-09-20 16:32:27');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `fullName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `enable` tinyint(1) NULL DEFAULT 1 COMMENT '启用 1 禁用 0',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'https://qiniu.qyhever.com/1540877344375', 'admin', '刘洋', '$2a$10$uyBNSPnbN.EHk4SKg0UZceTS.Doaq5N2O/Zz603a/PWWby/mW24Z2', 1, '2019-10-03 12:39:45', '2019-10-03 12:39:45');
INSERT INTO `user` VALUES (2, 'https://qiniu.test.qyhever.com/FikGFaAO2Oz3ELQX7O_muuT2Ya1O', 'crazy', '张薇', '$2a$10$uyBNSPnbN.EHk4SKg0UZceTS.Doaq5N2O/Zz603a/PWWby/mW24Z2', 1, '2019-10-10 22:18:20', '2019-10-14 10:44:14');
INSERT INTO `user` VALUES (3, 'https://qiniu.test.qyhever.com/FjlzQFN5G6ifjIOrGYxprjZ0FIq8', 'interesting', '张安', '$2a$10$uyBNSPnbN.EHk4SKg0UZceTS.Doaq5N2O/Zz603a/PWWby/mW24Z2', 1, '2019-10-11 11:22:20', '2019-10-18 15:06:10');
INSERT INTO `user` VALUES (5, 'https://qiniu.test.qyhever.com/FpTeqK-DtoEYvSwVKf_qqzgnLG8W', 'lonely', '李明', '$2a$10$y96fZ3m64rnr2wCwSU5Qs./EFgDAQbEpqodszvZNxLjGpTuCO7/SW', 1, '2019-10-18 15:41:28', '2019-10-18 15:41:28');

-- ----------------------------
-- Table structure for user_role_relation
-- ----------------------------
DROP TABLE IF EXISTS `user_role_relation`;
CREATE TABLE `user_role_relation`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `roleId` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role_relation
-- ----------------------------
INSERT INTO `user_role_relation` VALUES (4, 1, 1, '2019-10-11 10:07:32', '2019-10-11 10:07:32');
INSERT INTO `user_role_relation` VALUES (21, 3, 2, '2019-10-11 11:22:20', '2019-10-11 11:22:20');
INSERT INTO `user_role_relation` VALUES (22, 3, 3, '2019-10-11 11:22:20', '2019-10-11 11:22:20');
INSERT INTO `user_role_relation` VALUES (25, 2, 3, '2019-10-14 10:44:14', '2019-10-14 10:44:14');
INSERT INTO `user_role_relation` VALUES (26, 2, 4, '2019-10-14 10:44:14', '2019-10-14 10:44:14');
INSERT INTO `user_role_relation` VALUES (27, 2, 2, '2019-10-14 10:44:14', '2019-10-14 10:44:14');
INSERT INTO `user_role_relation` VALUES (28, 4, 3, '2019-10-18 11:51:14', '2019-10-18 11:51:14');
INSERT INTO `user_role_relation` VALUES (29, 5, 5, '2019-10-18 15:41:28', '2019-10-18 15:41:28');

SET FOREIGN_KEY_CHECKS = 1;
