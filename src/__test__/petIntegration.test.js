const request = require('supertest');
const app = require('../../backend/config/server')
const petRoutes = require('../../routes/petRoutes'); // ปรับเส้นทางให้ถูกต้อง
const Pet = require('../../backend/models/Pet');
const sequelize = require('../../backend/config/database'); // นำเข้าการตั้งค่า sequelize


describe('Integration Tests for Pet API', () => {
    beforeAll(async () => {
        await Pet.sync({ force: true }); // Reset the database before tests

        // สร้างสัตว์เลี้ยงสำหรับการทดสอบ
        await Pet.create({
            name: 'Fido',
            animal: 'Dog',
            breed: 'Poodle',
            age: 2,
            location: 'San Francisco',
            sex: 'Male',
        });

        // สร้างสัตว์เลี้ยงเพิ่มเติมเพื่อทดสอบการดึงข้อมูล
        await Pet.create({
            name: 'Bella',
            animal: 'Dog',
            breed: 'Bulldog',
            age: 5,
            location: 'Miami',
            sex: 'Female',
        });
    });
    it('should create a new pet entry', async () => {
        const newPet = {
            name: 'Buddy',
            animal: 'Dog',
            breed: 'Labrador',
            age: 3,
            location: 'New York',
            sex: 'Male',
        };

        const response = await request(app)
            .post('/api/pets')
            .send(newPet)
            .expect(201);

        expect(response.body.name).toBe(newPet.name);
    });

    it('should update an existing pet entry', async () => {
        // Create a pet to update
        const createdPet = await Pet.create({
            name: 'Max',
            animal: 'Cat',
            breed: 'Siamese',
            age: 2,
            location: 'Los Angeles',
            sex: 'Male',
        });

        const updatedPet = {
            name: 'Maxine',
            animal: 'Cat',
            breed: 'Siamese',
            age: 3,
            location: 'Los Angeles',
            sex: 'Female',
        };

        const response = await request(app)
            .put(`/api/pets/${createdPet.id}`)
            .send(updatedPet)
            .expect(200);

        expect(response.body.name).toBe(updatedPet.name);
    });

    it('should retrieve all pets', async () => {
        const response = await request(app)
            .get('/api/pets')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 400 for missing required fields', async () => {
        const newPet = {
            // ข้อมูลบางฟิลด์ถูกลบออก เช่น name
            animal: 'Dog',
            breed: 'Labrador',
            age: 3,
            location: 'New York',
            sex: 'Male',
        };

        const response = await request(app)
            .post('/api/pets')
            .send(newPet)
            .expect(400);

        expect(response.body.error).toBeDefined();
    });

    it('should return 404 for updating a non-existing pet', async () => {
        const updatedPet = {
            name: 'Maxine',
            animal: 'Cat',
            breed: 'Siamese',
            age: 3,
            location: 'Los Angeles',
            sex: 'Female',
        };

        const response = await request(app)
            .put('/api/pets/9999') // ใช้ ID ที่ไม่มีอยู่
            .send(updatedPet)
            .expect(404);

        expect(response.body.error).toBeDefined();
    });

    it('should retrieve a pet by ID', async () => {
        // สร้างสัตว์เลี้ยงที่เราต้องการดึงข้อมูล
        const createdPet = await Pet.create({
            name: 'Bella',
            animal: 'Dog',
            breed: 'Bulldog',
            age: 5,
            location: 'Miami',
            sex: 'Female',
        });

        const response = await request(app)
            .get(`/api/pets/${createdPet.id}`)
            .expect(200);

        expect(response.body.name).toBe(createdPet.name);
    });


    it('should delete an existing pet entry', async () => {
        const createdPet = await Pet.create({
            name: 'Charlie',
            animal: 'Dog',
            breed: 'Beagle',
            age: 4,
            location: 'Chicago',
            sex: 'Male',
        });

        console.log(`Pet created with ID: ${createdPet.id}`); // ตรวจสอบ ID ที่ถูกสร้าง

        await request(app)
            .delete(`/api/pets/${createdPet.id}`)
            .expect(204);

        // ตรวจสอบว่า pet ถูกลบออกจากฐานข้อมูลแล้ว
        const pet = await Pet.findByPk(createdPet.id);
        expect(pet).toBeNull();
    });

    it('should return 404 for a non-existing pet', async () => {
        const response = await request(app)
            .get('/api/pets/9999') // ใช้ ID ที่ไม่มีอยู่
            .expect(404);

        expect(response.body.error).toBeDefined();
    });




    afterAll(async () => {
        await sequelize.close(); // ปิดการเชื่อมต่อกับฐานข้อมูล
    });

});