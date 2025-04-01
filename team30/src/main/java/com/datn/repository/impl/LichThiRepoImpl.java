    package com.datn.repository.impl;/*
     * @project team30
     * @author Huy
     */

    import com.datn.dto.request.LichThiAddDTO;
    import com.datn.dto.request.LichThiUpdateDTO;
    import com.datn.entity.LichThi;
    import com.datn.entity.LinhVuc;
    import com.datn.repository.LichThiRepo;
    import jakarta.persistence.EntityManager;
    import jakarta.persistence.PersistenceContext;
    import org.springframework.stereotype.Repository;

    import java.util.List;

    @Repository
    public class LichThiRepoImpl implements LichThiRepo {

        @PersistenceContext
        private EntityManager entityManager;

        @Override
        public LichThi add(LichThiAddDTO lichThiDTO) {
            LichThi lichThi = new LichThi();
            lichThi.setMaLichThi(lichThiDTO.getMaLichThi());
            lichThi.setLinhVuc(getLinhVucById(lichThiDTO.getMaLinhVuc()));
            lichThi.setTenChungChi(lichThiDTO.getTenChungChi());
            lichThi.setNgayThi(lichThiDTO.getNgayThi());
            lichThi.setLePhiThi(lichThiDTO.getLePhiThi());
            lichThi.setThongTinChiTiet(lichThiDTO.getThongTinChiTiet());

            entityManager.persist(lichThi);
            return lichThi;
        }

        @Override
        public LichThi update(String id, LichThiUpdateDTO lichThiDTO) {
            LichThi lichThi = entityManager.find(LichThi.class, id);
            if (lichThi == null) {
                throw new IllegalArgumentException("Lịch thi không tồn tại: " + id);
            }

            lichThi.setTenChungChi(lichThiDTO.getTenChungChi());
            lichThi.setNgayThi(lichThiDTO.getNgayThi());
            lichThi.setLePhiThi(lichThiDTO.getLePhiThi());
            lichThi.setThongTinChiTiet(lichThiDTO.getThongTinChiTiet());

            // if maLinhVuc != null, set new LinhVuc
            if (lichThiDTO.getMaLinhVuc() != null) {
                lichThi.setLinhVuc(getLinhVucById(lichThiDTO.getMaLinhVuc())); // call function getLinhVucById
            }

            entityManager.merge(lichThi);
            return lichThi;
        }

        @Override
        public void delete(String id) {
            LichThi lichThi = entityManager.find(LichThi.class, id);
            if (lichThi != null) {
                entityManager.remove(lichThi);
            } else {
                throw new IllegalArgumentException("Lịch thi không tồn tại với ID: " + id);
            }
        }

        @Override
        public List<LichThi> search(String maLichThi, String tenChungChi) {
            String jpql = "SELECT l FROM LichThi l WHERE (:maLichThi IS NULL OR l.maLichThi = :maLichThi) " +
                    "AND (:tenChungChi IS NULL OR l.tenChungChi LIKE :tenChungChi)";
            return entityManager.createQuery(jpql, getEntityClass())
                    .setParameter("maLichThi", maLichThi)
                    .setParameter("tenChungChi", tenChungChi != null ? "%" + tenChungChi + "%" : null)
                    .getResultList();
        }

        private LinhVuc getLinhVucById(String maLinhVuc) {
            LinhVuc linhVuc = entityManager.find(LinhVuc.class, maLinhVuc);
            if (linhVuc == null) {
                throw new IllegalArgumentException("Lĩnh vực không tồn tại: " + maLinhVuc);
            }
            return linhVuc;
        }

        private Class<LichThi> getEntityClass() {
            return LichThi.class;
        }

    }
