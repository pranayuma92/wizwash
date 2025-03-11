/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('username');
    table.string('email');
    table.string('password');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).createTable('tenant', (table) => {
    table.increments('id');
    table.string('name');
    table.string('domain');
    table.boolean('active');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).createTable('user_tenant', (table) => {
    table.increments('id');
    table.integer('user_id', 11).unsigned().references('user.id');
    table.integer('tenant_id', 11).unsigned().references('tenant.id');
    table.string('role');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).createTable('product', (table) => {
    table.increments('id');
    table.string('code');
    table.string('name');
    table.integer('price');
    table.string('unit');
    table.string('desc');
    table.integer('tenant_id', 11).unsigned().references('tenant.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).createTable('config', (table) => {
    table.increments('id');
    table.string('key');
    table.string('value');
    table.string('type');
    table.string('label');
    table.integer('tenant_id', 11).unsigned().references('tenant.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).createTable('member', (table) => {
    table.increments('id');
    table.string('fullname');
    table.string('address');
    table.string('email');
    table.string('phone');
    table.integer('tenant_id', 11).unsigned().references('tenant.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).createTable('order', (table) => {
    table.increments('id');
    table.string('invoice_code');
    table.string('date');
    table.string('status');
    table.boolean('is_paid');
    table.integer('extra_charge');
    table.integer('discount');
    table.string('discount_type');
    table.integer('tax');
    table.string('paid_date');
    table.integer('total');
    table.integer('tenant_id', 11).unsigned().references('tenant.id');
    table.integer('member_id', 11).unsigned().references('member.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).createTable('order_detail', (table) => {
    table.increments('id');
    table.string('qty');
    table.string('desc');
    table.integer('order_id', 11).unsigned().references('order.id');
    table.integer('product_id', 11).unsigned().references('product.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('user')
    .dropTable('tenant')
    .dropTable('user_tenant')
    .dropTable('product')
    .dropTable('config')
    .dropTable('member')
    .dropTable('order')
    .dropTable('order_detail')
};
